import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../_service/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.css']
})
export class RegestrationComponent implements OnInit {

  constructor(private service:RegistrationService,private nav:Router) { }

  ngOnInit() {
    
  }

}
