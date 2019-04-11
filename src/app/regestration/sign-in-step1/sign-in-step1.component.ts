import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { RegistrationService } from 'src/app/_service/registration.service';


@Component({
  selector: 'app-sign-in-step1',
  templateUrl: './sign-in-step1.component.html',
  styleUrls: ['./sign-in-step1.component.css']
})
export class SignInStep1Component implements OnInit {
  

  private step1:object={
    id:"",
    email:"",
    password:""
  };
  private regEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  private ConfirmPass:number;
  private emptyInput=0;
  private errorID=0;
  private errorEmail=0;
  private Passexists=0;
  private errorPass=0;

  constructor(private reg_service:RegistrationService,private nav:Router) { }

  ngOnInit() {
  }

  async next(){
    this.emptyInput=0;
    this.errorID=0;
    this.errorEmail=0;
    this.Passexists=0;
    this.errorPass=0;

    let test = this.regEmail.test(this.step1['email']);
    console.log(test);
    if (this.step1['id']==''){
      this.emptyInput=1;
    }else{
      this.emptyInput=0;

      let CustomerID=await this.reg_service.CheckCustomerID(`CheckCustomerID/${this.step1['id']}`);
      this.reg_service.Registration_1=this.step1;

      console.log(this.reg_service.Registration_1);
      console.log(CustomerID);
      if (CustomerID){
        this.errorID=1;
        console.log('ok');
      }
    } 

    if(!test)
      this.errorEmail=1;

    if(this.step1['password']=='')
      this.emptyInput=1;
    else{
      let PassExists=await this.reg_service.PassExists(`PassExists/${this.step1['password']}`);
      console.log('PassExists');
      if (PassExists)
        this.Passexists=1;
    }

    if(this.step1['password'] !== this.ConfirmPass)
      this.errorPass=1;
      
    if(this.errorID==0 && this.errorEmail==0 && this.errorPass==0 && this.Passexists==0 && this.emptyInput==0)
      this.nav.navigate(['sign-in-step2']);
  }

  back() {
    this.nav.navigate(['main']);
  }

}
