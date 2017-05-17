import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import {RouterModule, Routes} from "@angular/router";

const ROUTES : Routes = [ 
	{path : 'landing' , component : LandingComponent},
	{path : '', redirectTo : '/landing', pathMatch : "full"}
	]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [LandingComponent],
  exports : [LandingComponent]
})
export class LandingModule { }
