import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppig-sidebar',
  templateUrl: './shoppig-sidebar.component.html',
  styleUrls: ['./shoppig-sidebar.component.css']
})
export class ShoppigSidebarComponent implements OnInit {

  private Cart_Id;
  private Product_Update;
  private count=1;
  
  constructor(private service:ShoppingService,private main_service:MainServiceService,private nav:Router) {}

  async ngOnInit() {
 
    console.log('Product_in_Cart',this.service.Product_in_Cart);
    console.log('Cart',this.main_service.Cart);
    console.log(this.service.ShowSideBar);
    console.log('shopping',this.main_service.CartExist);
    
    if(this.main_service.CartExist==0){//no open cart exsits
      this.Cart_Id=this.main_service.NewCart[0]['cart_id'];
    }else{
      this.Cart_Id=this.main_service.Cart[0]['cart_id'];
      this.main_service.OpenCart=true;
      console.log(this.main_service.OpenCart);
      if (this.main_service.Cart[0]['total_p'])
        this.service.Total_Cart_Price=this.main_service.Cart[0]['total_p'];
    }
  }


  Hide_SideBar(){
    this.service.ShowSideBar=false;
    console.log(this.service.ShowSideBar);
  }

  async DeleteProduct_In_Cart(id,cart_id){
    await this.service.Delete_Product_In_Cart(`deleteProduct_In_Cart/${id}/${cart_id}`);
    
  }

  counter(flag,i){
    this.count=this.service.Product_in_Cart[i]['quantity'];
    if(flag==='increment'){
      this.count++;
    }
    if(flag==='decrement'){
      this.count--;
    }
   this.service.Product_in_Cart[i]['quantity']= this.count;
  }

  async UpdateQuantity(q,id,prod_id,cart_id){
    let p_price=0;
 
    this.service.products.forEach((val:any)=>{
      if(val['product_id']===prod_id)
        p_price=val['price'];
    });
  
    let total= p_price * q;
    
    this.Product_Update={
      id:id,
      quantity:q,
      total_price:total,
      cartID:cart_id
    }
    console.log(this.Product_Update);

    await this.service.UpdateQuantity(`UpdateQuantity`,this.Product_Update);
  }

  async DeleteAllItems(cart_id){
    await this.service.DeleteAllProducts(`DeleteAllProducts/${cart_id}`);
    this.service.Total_Cart_Price=0;
    this.service.Total_Products_Quantity=0;
  }

  Order(){
    this.main_service.ShoppingMain=0;
    this.nav.navigate(['order']);
  }

}
