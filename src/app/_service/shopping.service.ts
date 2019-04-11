import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {


  constructor(public http:Http) { }

  ServerUrl = "http://localhost:4000/";

  public AllCategorys:Array<object>=[];
  public Cart:Array<object>=[];
  public Product_in_Cart:Array<object>=[];
  public products:Array<object>=[];
  public ShowCatNav=0;
  public ShowSideBar:boolean=true;
  public Total_Cart_Price=0;
  public Total_Products_Quantity=0;
  public OrderSubmited:boolean=false;
  
 

  GetCategorys(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.AllCategorys=data;
      console.log(data);
    }).toPromise();
  }

  Categoryprods(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      console.log(data);
    }).toPromise();
  }

  searchProduct(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.products=data;
      
      console.log(data);
    }).toPromise();
  }

  GetProduct_In_Cart(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.Product_in_Cart=data;
      this.total_price();
      console.log(this.Total_Products_Quantity);
    }).toPromise();
  }

  AddToCart(url,obj){
    return this.http.post(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
      this.Product_in_Cart=[];
      this.Product_in_Cart=data;
      this.total_price();
      console.log(data);
    }).toPromise();
  }

  UpdateQuantity(url,obj){
    return this.http.put(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
      this.Product_in_Cart=[];
      this.Product_in_Cart=data;
      this.total_price();
      console.log(data);
    }).toPromise();
  }

  Delete_Product_In_Cart(url)
  {
      return this.http.delete(this.ServerUrl + url).map(res => res.json()).do((data) => {
        this.Product_in_Cart=[];
        this.Product_in_Cart=data;
        this.total_price();
        console.log(this.Product_in_Cart);
        console.log(data);
      }).toPromise();
  }


  DeleteAllProducts(url)
  {
    return this.http.delete(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.Product_in_Cart=data;
      console.log(data);
    }).toPromise();
  }


  total_price(){
    let item;
    this.Total_Cart_Price=0;
    this.Total_Products_Quantity=0;

    for(item in this.Product_in_Cart){
      this.Total_Cart_Price += this.Product_in_Cart[item]['total_price'];
      this.Total_Products_Quantity+=this.Product_in_Cart[item]['quantity'];
    }
  }
  
}
