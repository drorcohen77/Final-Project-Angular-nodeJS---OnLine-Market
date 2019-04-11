import { Component, OnInit, Input } from '@angular/core';
import { ShoppingService } from 'src/app/_service/shopping.service';
import { AdminService } from 'src/app/_service/admin.service';
import { MainServiceService } from 'src/app/_service/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent implements OnInit {

  @Input() prod:object;

  private emptyInput=0;
  private imageInput=0;
  private categories:Array<object>=[];
  
  private Product:object={
    product_id:"",
    product_name:"",
    price:"",
    category_id:"",
    image:""
  };

  title = 'uploadFile';

  filesToUpload: File = null;

  constructor(private shopping_service:ShoppingService,private admin_service:AdminService,private nav:Router) { }

  ngOnInit() {
    this.categories =this.shopping_service.AllCategorys;
    console.log(this.categories);
    this.admin_service.imgeUrl='../../../assets/pictures/noImageAvailable330.gif';
  }

  Add_Product(){
    this.emptyInput=0;
    this.imageInput=0;
    this.admin_service.Action='add';
    this.admin_service.imgeUrl='../../../assets/pictures/noImageAvailable330.gif';
    console.log(this.admin_service.Action);
  }

  async Add(){
    this.imageInput=0;
    this.emptyInput=0;
   
    if (this.Product['product_name']=='')
      this.emptyInput=1;
    if (this.Product['price']=='')
      this.emptyInput=1;
    if (this.Product['category_id']=='')
      this.emptyInput=1;

    await this.upload();
    
    if(this.emptyInput!=1 && this.imageInput!=1){
      
      this.shopping_service.products=await this.admin_service.AddProduct('AddProduct',this.Product);
      this.Product={};
      this.admin_service.imgeUrl='../../../assets/pictures/noImageAvailable330.gif';
    }
      
  }

  async Edit(){
    this.imageInput=0;
    this.emptyInput=0;
  
    if (this.prod['product_name']=='')
      this.emptyInput=1;
    if (this.prod['product_price']=='')
      this.emptyInput=1;
    if (this.prod['category_id']=='')
      this.emptyInput=1;
      
    await this.upload();
    
    if(this.emptyInput!=1 && this.imageInput!=1){
     
      this.shopping_service.products=await this.admin_service.EditProduct('EditProduct',this.prod);
      this.prod={};
      this.admin_service.Action='';
      this.admin_service.imgeUrl='../../../assets/pictures/noImageAvailable330.gif';
    }

      
  }


  async upload() {
      const formData: any = new FormData();
      const files: Array<File> = [];
      files.push(this.filesToUpload);
      console.log(files);

      if(files[0]){
        formData.append("uploads[]", files[0], files[0]['name']);
      
        let ImagName = files[0]['name'];
        formData.append("ImagName", ImagName);

        console.log('form data variable :   ', formData);
        this.admin_service.UploadImage('upload',formData);

        this.Product['image']=ImagName;

        if (this.prod){
          this.prod['image']=ImagName;
        }
        ImagName='';
      }else
        this.imageInput=1;
      
  }

  fileChangeEvent(file: any) {
    console.log(file);
    this.filesToUpload =file.target.files[0];
    
    console.log(this.filesToUpload);
    var reader =new FileReader();
    reader.onload =(event:any)=>{
      this.admin_service.imgeUrl=event.target.result;
    }
    reader.readAsDataURL(this.filesToUpload);
  }

}
