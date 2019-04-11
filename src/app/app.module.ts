// import { CountUpModule } from 'countup.js-angular2';

import { LogInComponent } from './main/log-in/log-in.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MainServiceService } from './_service/main-service.service';
import { ShoppingService } from './_service/shopping.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { AboutComponent } from './main/about/about.component';
import { InfoComponent } from './main/info/info.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { SignInStep1Component } from './regestration/sign-in-step1/sign-in-step1.component';
import { SignInStep2Component } from './regestration/sign-in-step2/sign-in-step2.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppigSidebarComponent } from './shopping/shoppig-sidebar/shoppig-sidebar.component';
import { ShoppingProductsComponent } from './shopping/shopping-products/shopping-products.component';
import { OrderComponent } from './order/order.component';
import { SubmitOrderComponent } from './order/submit-order/submit-order.component';
import { ReciptComponent } from './order/recipt/recipt.component';
import { RegistrationService } from './_service/registration.service';
import { OrdersService } from './_service/orders.service';
import { AdminService } from './_service/admin.service';
import { SearchPipe } from './_pipe/search.pipe';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdminProductsComponent } from './administrator/admin-products/admin-products.component';
import { AddEditProductsComponent } from './administrator/add-edit-products/add-edit-products.component';




const appRoutes:Routes=[
  {
    path:'',
    redirectTo:'/main',
    pathMatch:'full'
  },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'regestration',
    component:RegestrationComponent
  },
  {
    path:'sign-in-step1/:step1',
    component:SignInStep1Component
  },
  {
    path:'sign-in-step2',
    component:SignInStep2Component
  },
  {
    path:'shopping',
    component:ShoppingComponent,
  },
  {
    path:'order',
    component:OrderComponent,
  },
  {
    path:'administrator',
    component:AdministratorComponent,
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    AboutComponent,
    InfoComponent,
    RegestrationComponent,
    SignInStep1Component,
    SignInStep2Component,
    ShoppingComponent,
    ShoppigSidebarComponent,
    ShoppingProductsComponent,
    OrderComponent,
    SubmitOrderComponent,
    ReciptComponent,
    SearchPipe,
    AdministratorComponent,
    AdminProductsComponent,
    AddEditProductsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    // CountUpModule
  ],
  providers: [MainServiceService,ShoppingService,RegistrationService,OrdersService,AdminService,FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
