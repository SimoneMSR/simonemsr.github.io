import { Component, OnInit, Input } from '@angular/core';
import {Installer} from "../../";

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	@Input() installer : Installer;
	@Input() avatarUrl : any;
	public source : string;
	constructor() { 
		this.source = '/assets/emptycard.svg';
	}

	ngOnInit() {
	}

	counter(star : number){
		return new Array(star);
	}

}
