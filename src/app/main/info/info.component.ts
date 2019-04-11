import { MainServiceService } from './../../_service/main-service.service';
import { Component, OnInit,} from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  private fullName:string="";
  private products:Array<object>=[];
  private orders:Array<object>=[];

  constructor(private service:MainServiceService,private shopping_service:ShoppingService) {
    
   }


  async ngOnInit() {
    
    this.orders= await this.service.OrdersService('getOrders');
    console.log(this.orders.length);

    this.products=await this.service.ProductService('getProducts');
    console.log(this.products.length);
  }

}
