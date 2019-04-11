import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ServerUrl = "http://localhost:4000/";

public OrderSubmited=false;

  constructor(public http:Http) { }

  SubmitOrder(url,obj){
    return this.http.post(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
      this.OrderSubmited=data;
      console.log(data);
    }).toPromise();
  }

  Download_Recipt(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
      console.log(data);
    }).toPromise();
  }
}
