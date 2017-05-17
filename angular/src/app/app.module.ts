import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {MapModule} from "./map";
import {CoreModule} from "./core";
import {NavbarModule} from "./navbar";
import {LandingModule} from "./landing";

import {InstallerService} from "./installer.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    MapModule,
    NavbarModule,
    RouterModule,
    LandingModule
  ],
  providers: [InstallerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
