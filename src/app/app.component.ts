import { Component } from '@angular/core';
import { MainServiceService } from './_service/main-service.service';
import { Router } from '@angular/router';
import { ShoppingService } from './_service/shopping.service';
import { AdminService } from './_service/admin.service';
import { RegistrationService } from './_service/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { title = 'AngularNodeJsProject';

  private item="";

  constructor(
    private service:MainServiceService,
    private reg_service:RegistrationService,
    private ShoppingService:ShoppingService,
    private admin_service:AdminService,
    private nav:Router) { 
  }

  async ngOnInit() {
    this.service.BackToShopping=0;
    this.service.ShoppingMain=0;
    console.log('BackToShopping',this.service.BackToShopping);
    console.log('start',this.service.ShoppingMain);
    console.log('Total_Products_Quantity',this.ShoppingService.Total_Products_Quantity);
  }

  async SearchProduct(){
    
    console.log(this.item);
    let prod=JSON.stringify(this.item);
    await this.ShoppingService.searchProduct(`searchProduct/${prod}`);
    console.log(this.ShoppingService.products);
    this.ShoppingService.ShowCatNav=1;
    this.item="";
  }

  async LogOut(){

    await this.service.LogOutService(`logout`);

    this.service.submitted=false;
    this.service.ShoppingMain=0;
    this.service.BackToShopping=0;
    this.admin_service.Action='';
    this.admin_service.imgeUrl='';
    this.service.ShowStartButton=0;
    this.reg_service.submit=false;
    this.reg_service.newCustomer=[];
    this.service.LoginObj=[];
    this.service.FirstPurchase=false;
    this.service.CartExist=2;//return 'CartExist'  to it's original state
    

    console.log(this.service.ShoppingMain);

    if(this.service.LogOut)
      this.nav.navigate(['/']);
  }

  GoToAdmin(){
    this.service.ShoppingMain=1;
    this.service.BackToShopping=1;
    this.admin_service.Action='';

    this.nav.navigate(['administrator']);
  }

  GoToShopping(){
    this.service.ShowStartButton=1;
    this.service.BackToShopping=0;
    this.service.ShoppingMain=0;

    if(this.service.OpenCart==true){
      this.service.CartExist=1;
      console.log('Exist',this.service.CartExist,'open',this.service.OpenCart)
    }
    else{
      this.service.CartExist=0;
      console.log('Exist',this.service.CartExist,'open',this.service.OpenCart)
    }

    this.nav.navigate(['main']);
  }
}
