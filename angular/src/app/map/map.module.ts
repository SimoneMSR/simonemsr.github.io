import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { MapPageComponent } from './map-page/map-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {CardComponent} from "./installer/card/card.component";
import { TableComponent } from './installer/table/table.component';

const APIKEY= "AIzaSyDYcg_LoArswlqlZPxkgJuOihGYQLSVOwc";

const ROUTES : Routes = [ 
	{path : 'map' , component : MapPageComponent}
	]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: APIKEY
    }),
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [MapPageComponent, SidebarComponent, CardComponent, TableComponent],
  exports : [MapPageComponent, SidebarComponent, CardComponent, TableComponent]
})
export class MapModule { 
	public static API_KEY =  APIKEY;
}
