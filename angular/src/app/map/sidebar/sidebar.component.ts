import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Installer} from "../";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input("toggle") toggle;
  @Input("installer") installer : Installer;
  @Output("hasToggled") hasToggled : EventEmitter<boolean>;
  constructor() {
  	this.hasToggled = new EventEmitter<boolean>(false);
  }

  ngOnInit() {
  }

  fireToggle(){
  	 this.hasToggled.emit(true);
  }

}
