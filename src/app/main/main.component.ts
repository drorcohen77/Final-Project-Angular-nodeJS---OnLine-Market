import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../_service/main-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private service:MainServiceService,private nav:Router) { }

  ngOnInit() {
    this.service.ShoppingMain==0
  }

}
