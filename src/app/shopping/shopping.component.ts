import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../_service/main-service.service';
import { Router } from '@angular/router';
import { ShoppingService } from '../_service/shopping.service';
import { AdminService } from '../_service/admin.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor(private main_service:MainServiceService,private shopping_service:ShoppingService,private admin_service:AdminService,private nav:Router) { }

  async ngOnInit() {
    await this.main_service.CheckSession('CheckSession');
    console.log(this.main_service.Session);

    if(this.admin_service.ShowProducts.length==0){
      console.log(this.admin_service.ShowProducts);
      this.nav.navigate(['main']);
    }
    this.main_service.ShoppingMain=1;
  }

}
