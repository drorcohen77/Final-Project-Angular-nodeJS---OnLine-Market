import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../_service/main-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private main_service:MainServiceService,private admin_service:AdminService,private nav:Router) { }

  async ngOnInit() {

    await this.main_service.CheckSession('CheckSession');
    console.log(this.main_service.Session);
    // if(this.main_service.Session==false){
    //   console.log(this.main_service.Session);
    //     this.nav.navigate(['main']);
    //   }
    if(this.admin_service.ShowProducts.length==0){
      console.log(this.admin_service.ShowProducts);
        this.nav.navigate(['main']);
      }
    this.main_service.ShoppingMain=1;
  }

}
