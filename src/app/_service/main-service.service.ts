import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class MainServiceService {

  ServerUrl = "http://localhost:4000/";
  public Session=true;
  public LoginObj:Array<object>=[];
  public submitted = false; //for hiding login inputs after user loged in
  public LogOut=false;
  public ShowStartButton=0;
  public BackToShopping=0;//index to create option to get from admin page to shopping page
  public NumOrders:number;
  public NumProducts:number;
  public Cart:Array<object>=[];
  public CartExist;
  public FirstPurchase;
  public ShoppingMain=0;
  public NewCart:Array<object>=[];
  public OpenCart=false;
  

  constructor(public http:Http,private nav:Router) { }

  CheckSession(url){

    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.Session=data
      console.log("data", this.Session);
      if(this.Session==false){
        console.log(this.Session);
          this.nav.navigate(['main']);
      }
    }).toPromise();
  }
  

  CustomerServiceLogin(url,obj)
  {
    console.log(obj);
    return this.http.post(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
      this.LoginObj=data;
      console.log(this.LoginObj);
    }).toPromise();
  }

  LogOutService(url)
  {
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.LogOut=data;
      console.log( this.LogOut);
    }).toPromise();
  }

  GetCartService(url)
  {
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      this.Cart=data;
      console.log(this.Cart);
      if(this.Cart.length==0){
        console.log('FirstPurchase')
        this.FirstPurchase=true;
      }else if (this.Cart[0]['status']==1){
        console.log('custezsit')
        this.CartExist=0; //no open cart 
      }else{
        this.CartExist=1; //there is an open cart
        this.FirstPurchase=false;
      }
      console.log(this.CartExist);
    }).toPromise();
  }

  OpenNewCart(url,id)
  {
    return this.http.post(this.ServerUrl + url,id).map(res => res.json()).do((data) => {
      this.NewCart=data;
      console.log(this.NewCart);
    }).toPromise();
  }

  ProductService(url)
  {
      return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
        this.NumProducts=data;
        console.log(this.NumProducts);
      }).toPromise();
  }

  OrdersService(url)
  {
      return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
        this.NumOrders=data;
        console.log(this.NumOrders);
      }).toPromise();
  }

}

