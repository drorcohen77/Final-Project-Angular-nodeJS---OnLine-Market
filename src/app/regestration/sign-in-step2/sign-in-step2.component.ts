import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from 'src/app/_service/registration.service';
import { MainServiceService } from 'src/app/_service/main-service.service';

@Component({
  selector: 'app-sign-in-step2',
  templateUrl: './sign-in-step2.component.html',
  styleUrls: ['./sign-in-step2.component.css']
})
export class SignInStep2Component implements OnInit {


  private citys=['Tel-Aviv','Jerusalem','Haifa','Rishon-Letzion','Beer-Sheva','Natania','Petach-Tikva','Hadera','Herzelia','Modien'];
  private step2:object={
    city:"",
    street:"",
    firstName:"",
    lastName:""
  };

  private emptyInput=0;

  constructor(private reg_service:RegistrationService,private service:MainServiceService, private route: ActivatedRoute,private nav:Router) {
   }

  ngOnInit() {
    console.log(this.reg_service.Registration_1);
  }
  
  async submit(){
    this.emptyInput=0;

    if(this.step2['city']=='' || this.step2['street']=='' || this.step2['firstName']=='' || this.step2['lastName']=='')
      this.emptyInput=1;
    else{
      this.reg_service.newUser={...this.reg_service.Registration_1, ...this.step2};
      console.log(this.reg_service.newUser);

      await this.reg_service.AddCustomerService('addCustomer',this.reg_service.newUser);
      console.log(this.reg_service.submit);
      if (this.reg_service.submit){
        this.service.submitted = true;
        this.service.ShowStartButton=0;
        this.nav.navigate(['main']);
      }
    }
  }

  back() {
    this.nav.navigate(['regestration']);
  }
}
