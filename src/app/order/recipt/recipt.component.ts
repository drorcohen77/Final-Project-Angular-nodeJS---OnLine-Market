import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_service/orders.service';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {

  constructor(private order_service:OrdersService,private main_service:MainServiceService,private shopping_service:ShoppingService,private nav:Router) { }

  public item:string='';
  private a:any;

  ngOnInit() {
    console.log(this.shopping_service.Product_in_Cart);
  }

}
