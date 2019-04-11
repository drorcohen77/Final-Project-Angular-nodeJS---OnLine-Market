import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  ServerUrl = "http://localhost:4000/";
  public submit=false;
  public IDexist="";
  public Passexist="";
  public checkSession="";
  public Registration_1:object={};
  public newUser:object={};
  public newCustomer:Array<object>=[];


  constructor(public http:Http) { }

  AddCustomerService(url,obj)
  {
      return this.http.post(this.ServerUrl + url,obj).map(res => res.json()).do((data) => {
        this.newCustomer=data;
        if(this.newCustomer.length>0)
          this.submit=true;
      }).toPromise();
  }

  CheckCustomerID(url)
  {
      return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
          this.IDexist=data;
          console.log(data);
      }).toPromise();
  }

  PassExists(url)
  {
    return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
        this.Passexist=data;
        console.log(data);
    }).toPromise();
  }

//   CheckSession(url)
//   {
//     return this.http.get(this.ServerUrl + url).map(res => res.json()).do((data) => {
//         this.checkSession=data;
//         console.log(data);
//     }).toPromise();
//   }
}
