import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  ServerUrl = "http://localhost:4000/";

public AllProducts=new BehaviorSubject([]);
public Action='';//for edit/add product form
public ShowProducts:Array<object>=[];
public imgeUrl: string ='';

  constructor(public http:Http) { }

  GetProductsService(url){
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
        this.AllProducts.next(data);
        console.log(data);
      console.log(this.AllProducts);
    }).toPromise();
  }

  AddProduct(url,obj){
    return this.http.post(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
        this.AllProducts.next(data);
      console.log(data);
    }).toPromise();
  }

  EditProduct(url,obj){
    return this.http.put(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
        this.AllProducts.next(data);
      console.log(this.AllProducts);
    }).toPromise();
  }
  
  UploadImage(url,formData){
    return this.http.post(this.ServerUrl + url, formData)
        .map(files => files.json())
        .subscribe(files => console.log('files', files))
  }
  
}