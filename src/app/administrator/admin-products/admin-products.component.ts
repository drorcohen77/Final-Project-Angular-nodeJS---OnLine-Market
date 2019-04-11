import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_service/admin.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  @Output() public product:EventEmitter<object>= new EventEmitter();

  private Choosen_P={};
  private Quantity:number=1;
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
    console.log(this.admin_service.ShowProducts);
    this.shopping_service.products = this.admin_service.ShowProducts;

    console.log(this.shopping_service.products);
  }

  async GetCategoryProds(i){
    console.log(i);
    this.shopping_service.products = await this.shopping_service.Categoryprods(`Categoryprods/${i}`);
  }

  EditProduct(id,name,price,image,category_id,category_name){
      let product_obj={
        product_id:id,
        product_name:name,
        product_price:price,
        product_image:image,
        category_id:category_id,
        category_name:category_name
      };

      this.product.emit(product_obj);
      this.admin_service.imgeUrl='../../../assets/pictures/'+product_obj.product_image;
      console.log(this.admin_service.imgeUrl);
      this.admin_service.Action='edit';
  }
  
  All_Products(){
    this.shopping_service.products = this.admin_service.ShowProducts;
    this.shopping_service.ShowCatNav=0;
  }
  
}
