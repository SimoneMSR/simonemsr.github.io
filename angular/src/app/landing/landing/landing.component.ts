import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	public address : string;
  constructor(private router : Router) {

  }

  ngOnInit() {
  }

  goToMap(){
  	this.router.navigate(['map' , {'address' : this.address}] );
  }

}
