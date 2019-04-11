import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { AdminService } from 'src/app/_service/admin.service';


@Component({
  selector: 'app-shopping-products',
  templateUrl: './shopping-products.component.html',
  styleUrls: ['./shopping-products.component.css']
})
export class ShoppingProductsComponent implements OnInit {

  private categorys:Array<object>=[];
  private Choosen_P={};
  private Quantity:number=1;
  private count=1;
  private Product_In_Cart;

  constructor(private shopping_service:ShoppingService,private main_service:MainServiceService,private admin_service:AdminService,private nav:Router) {

    admin_service.AllProducts.subscribe ({
      next:(data)=>this.admin_service.ShowProducts=data,
      error:(err)=>console.log(err),
      complete:()=>console.log("ok")
     });
   }

  ngOnInit() {
    console.log(this.shopping_service.ShowSideBar);

    this.shopping_service.products = this.admin_service.ShowProducts;
    console.log(this.admin_service.ShowProducts);

    this.categorys =this.shopping_service.AllCategorys;
    console.log(this.shopping_service.products);
    console.log(this.categorys);
  }

  All_Products(){
    this.shopping_service.products = this.admin_service.ShowProducts;
    this.shopping_service.ShowCatNav=0;
  }
  
  async AddProduct(id,name,price,image){
    this.Quantity=1;
    this.count=1;
    this.Choosen_P={//filling cart(new/exist one) with producrts , according to cart_id from main_service.NewCart[0]['cart_id']/main_service.Cart[0]['cart_id'].
      p_id:id,
      p_name:name,
      p_price:price,
      p_image:image,
      };
    
    let cust_id = {id:''};

    if(this.shopping_service.OrderSubmited==true){
      cust_id['id'] = this.main_service.LoginObj[0]['customer_id'];
      console.log(cust_id);
      await this.main_service.OpenNewCart(`OpenNewCart`,cust_id);
      this.main_service.CartExist=1;
      this.main_service.OpenCart=true;
      this.shopping_service.OrderSubmited=false;
      this.shopping_service.Product_in_Cart=[];
      this.shopping_service.Total_Cart_Price=0;
      this.shopping_service.Total_Products_Quantity=0;
    }

    console.log(this.Choosen_P);
  }

  async AddQuantity(Id,Price){
    this.count=1;
    let total= Price * this.Quantity;

    if (this.main_service.NewCart.length!=0) {//new cart opened

      this.Product_In_Cart={//filling cart(new/exist one) with producrt Quantity, according to cart_id from main_service.NewCart[0]['cart_id']/main_service.Cart[0]['cart_id'].
        product_id:Id,
        quantity:this.Quantity,
        total_price:total,
        cartID:this.main_service.NewCart[0]['cart_id']
      }
    }else{
      this.Product_In_Cart={
        product_id:Id,
        quantity:this.Quantity,
        total_price:total,
        cartID:this.main_service.Cart[0]['cart_id']
      }
    }
    console.log(this.Product_In_Cart);

    await this.shopping_service.AddToCart(`AddToCart`,this.Product_In_Cart);
    this.main_service.OpenCart=true;
    this.Quantity=1;
    
  }

  async GetCategoryProds(i){
    console.log(i);
    this.shopping_service.products = await this.shopping_service.Categoryprods(`Categoryprods/${i}`);
  }

  Show_SideBar(){
    this.shopping_service.ShowSideBar=true;
    console.log(this.main_service.NewCart.length);
    if (this.main_service.NewCart.length!=0){
      this.main_service.CartExist=1; //there is an open cart
    }
    console.log(this.shopping_service.ShowSideBar);
  }


  counter(flag){
  
    if(flag==='increment'){
      this.count++;
    }
    if(flag==='decrement'){
      this.count--;
    }
   this.Quantity= this.count;
   
  }
  
  close_modal(){
    this.Quantity=1;
  }

}
