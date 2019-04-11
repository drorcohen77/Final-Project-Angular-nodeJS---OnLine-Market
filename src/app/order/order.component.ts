import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../_service/main-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../_service/admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private main_service:MainServiceService,private admin_service:AdminService,private nav:Router) { }

  async ngOnInit() {
    await this.main_service.CheckSession('CheckSession');
    console.log(this.main_service.Session);
    
    if(this.admin_service.ShowProducts.length==0){
      console.log(this.admin_service.ShowProducts);
        this.nav.navigate(['main']);
      }
  }

}
