import { Router } from '@angular/router';
import { MainServiceService } from './../../_service/main-service.service';
import { Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { RegistrationService } from 'src/app/_service/registration.service';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { AdminService } from 'src/app/_service/admin.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  public CustomerDetails:Array<object>=[];
  Logobj:Object= {
    userid:"",
    pass:""
  };

  private errorMasge = 0;
  private userid_errorMasge = 0;
  private pass_errorMasge = 0;
  private customer_id={};


  constructor(private service:MainServiceService,private service_reg:RegistrationService,private shopping_service:ShoppingService,private admin_service:AdminService,private nav:Router) { }

  ngOnInit() {
    console.log(this.service_reg.submit);
    if(this.service_reg.submit) {
      this.service.ShowStartButton=0;
    }
  }

  async login(){
    this.service.ShowStartButton=0;
    console.log(this.service.ShowStartButton);
    if(this.Logobj['userid']=='')
      this.userid_errorMasge=1;
    if(this.Logobj['pass']=='')
      this.pass_errorMasge=1;

    if(this.Logobj['userid']!='' && this.Logobj['pass']!='') {
      console.log(this.Logobj);
      this.CustomerDetails=await this.service.CustomerServiceLogin('LogIn',this.Logobj);

      await this.shopping_service.GetCategorys(`GetCategorys`);
      await this.admin_service.GetProductsService(`GetAllProducts`);
      
      console.log(this.CustomerDetails);
      if(this.CustomerDetails.length>0) {// Start Shopping Button
        console.log(this.CustomerDetails[0]['customer_id']);
        await this.service.GetCartService(`GetCart/${this.CustomerDetails[0]['customer_id']}`);

        // console.log(this.service.Cart[0]['status']);

        this.service.submitted = true;
        this.service.ShowStartButton=1;
        
        console.log( this.service.FirstPurchase);
        if(this.service.FirstPurchase==false){
          await this.shopping_service.GetProduct_In_Cart(`GetProduct_In_Cart/${this.service.Cart[0]['cart_id']}`);
          console.log( this.shopping_service.Total_Cart_Price);
        }

        if(this.service.CartExist==0)
          this.shopping_service.Total_Products_Quantity=0;
        

      }else if(this.CustomerDetails){
        this.service.ShowStartButton=2;
        console.log(this.service.ShowStartButton);
      }else
        this.service.ShowStartButton=3;
        console.log(this.service.ShowStartButton);
        this.resetFields();
    }
  }


  signup(){
    this.nav.navigate(['regestration']);
    console.log("regestration comp.");
  }

  async shopping(){
    console.log(this.service.LoginObj);
    this.customer_id['id']=this.service.LoginObj[0]['customer_id'];
    console.log(this.customer_id);

    if (this.service.CartExist==0){//No Cart Open. Open New Cart
      await this.service.OpenNewCart('OpenNewCart',this.customer_id);
      this.shopping_service.Product_in_Cart=[];
      this.service.OpenCart=true;
    }
    this.nav.navigate(['shopping']);
  }

 
  resetFields(){
    this.Logobj={};
  }
}
