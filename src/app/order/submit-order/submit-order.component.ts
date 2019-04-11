import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { OrdersService } from 'src/app/_service/orders.service';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  private today;
  private emptyInput=0;
  private wrongDtae=0;
  private CreditFormat=0;
  private OrderCapacity=0;
  private city="";
  private CountOrders=0;
  private regCredit = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/);

  private Order={
    customer_id:'', //from main-service LoginObj array
    cart_id:'',//from shopping-service Product_in_Cart array
    total_price: 0,//from shopping-service Total_Cart_Price array
    city:'',//from main-service LoginObj array
    street:'',//from main-service LoginObj array
    shipping_date:'',
    credit:'',
  }

  constructor(private shopping_service:ShoppingService,private main_service:MainServiceService,private orders_service:OrdersService,private nav:Router) {
    const currentDate:Date = new Date();
    let dd:any = currentDate.getDate();
    let mm:any = currentDate.getMonth()+1;
    let yyyy:any = currentDate.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    this.today =  yyyy + '-' + mm + '-' + dd;
    
   }

  ngOnInit() {
    console.log('customer',this.main_service.LoginObj[0]);
    console.log('cart exists',this.main_service.CartExist);
  }

  GetCity(){
    this.Order.city=this.main_service.LoginObj[0]['city'];
  }

  GetStreet(){
    this.Order.street=this.main_service.LoginObj[0]['street'];
  } 

  async SubmitOrder(){

    
    // let shipp=this.Order['shipping_date'];
    // console.log(this.Order['shipping_date'],'now',now.toISOString());

    this.emptyInput=0;
    this.CountOrders=0;
    this.CreditFormat=0;

    if(this.Order['city']=='')
      this.emptyInput=1;
    if(this.Order['street']=='')
      this.emptyInput=1;
    if(this.Order['shipping_date']=='')
      this.emptyInput=1;
    // if(shipp < now.toISOString())
    //   this.emptyInput=1;
    else {
      let val:any;
      let list:any=this.main_service.NumOrders;

      console.log(this.main_service.NumOrders);
      for(val in list){
        console.log(list[val]['shipping_date']);
        console.log(this.Order['shipping_date']);
        if(list[val]['shipping_date'] === this.Order['shipping_date']){
          this.CountOrders++;
          console.log(this.CountOrders);
        }
      }
    }

    let test = this.regCredit.test(this.Order['credit']);
    console.log(test);

    if(!test){
      this.CreditFormat=1;
      console.log(this.CreditFormat);
    }
    
    if (this.CreditFormat!=1 && this.CountOrders<3){
      this.Order.customer_id=this.main_service.LoginObj[0]['customer_id'];
      this.Order.cart_id=this.shopping_service.Product_in_Cart[0]['cart_id'];
      this.Order.total_price=this.shopping_service.Total_Cart_Price;

      console.log('submit order',this.Order);

      await this.orders_service.SubmitOrder(`SubmitOrder`,this.Order);
      this.main_service.OpenCart=false;

      await this.main_service.GetCartService(`GetCart/${this.main_service.LoginObj[0]['customer_id']}`);

    console.log('submit order',this.Order);
    console.log('back to shopping',this.main_service.CartExist);
    }
  }

  async DownloadRecipt(cart_id){
    let total_price=this.Order.total_price;
    
    let Cart:Array<object>=[];

    this.shopping_service.Product_in_Cart.forEach(item => {
      console.log(item);

      let Recipt = 
      {
        p_name:item['product_name'],
        p_quantity:item['quantity'],
        p_total_price:item['total_price']
      };

      Cart.push(Recipt);
    });
    let Recipt =JSON.stringify(Cart);
    console.log('id',cart_id,total_price,Cart);
    await this.orders_service.Download_Recipt(`DownloadRecipt/${cart_id}/${total_price}/${Recipt}`);
  }

  Confirm(){
    this.main_service.CartExist=2;
    this.shopping_service.Product_in_Cart.length=0;
    this.shopping_service.OrderSubmited=true;
    this.shopping_service.Total_Products_Quantity=0;
    this.nav.navigate(['shopping']);
  }

}
