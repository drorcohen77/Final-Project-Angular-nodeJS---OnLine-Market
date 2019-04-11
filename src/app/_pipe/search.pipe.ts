import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingService } from '../_service/shopping.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  SearchResult:Array<object>=[];

  constructor(private shopping_service:ShoppingService) { }
      
  transform(value: any, item: string): any {
    console.log(this.shopping_service.Product_in_Cart);
      
    value=this.shopping_service.Product_in_Cart;
    console.log(value);
    this.SearchResult=[];
      
    value.forEach((val)=>{
            
      if(val['product_name'].indexOf(item)!==-1){
        this.SearchResult.push(val);
        console.log(this.SearchResult);
      }
    });
    return this.SearchResult
  }
      
}


