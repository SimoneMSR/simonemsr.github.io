import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Marker} from "../";
import {Installer} from "../";
import {InstallerService} from "../../installer.service";

declare var google: any;

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

	public toggle: boolean;
	lat: number = 51.678418;
	lng: number = 7.809007;
	circle_lat: number;
	circle_lng: number;
	circle_radius : number;
	markers : Marker[];
	installers : Installer[];
	selectedInstaller : Installer;
	 public data:Array<any>  = [];

	constructor(private installerService : InstallerService,
		private zone : NgZone,
		private routeParams: ActivatedRoute) {
	}

	ngOnInit() {
		this.initializePosition();
		this.circle_radius = 500000;
		this.toggle=false;
		this.circle_lat=this.lat;
		this.circle_lng = this.lng;
		this.markers = [];
		this.installers =[];
		this.selectedInstaller = null;
		var home = new Marker();
		home.draggable=true;
		home.lat  = 51.678418;
		home.lng = 7.809007;
		this.markers.push(home);
		this.getInstallers();
	}

	private initializePosition(){
		this.routeParams.params.subscribe( params => {
			this.installerService
				.getCoordinatesFromString(params['address'])
				.subscribe( coordinates => {
					this.lat=coordinates.lat;
					this.lng=coordinates.lng;
				})
		});
	}

	markerDragEnd(marker, event){
		console.log(marker);
		console.log(event);
	}

	circleCenterChange(event){
		this.circle_lat=event.lat;
		this.circle_lng=event.lng;
		this.refreshMarkers();
	}

	circleRadiusChange(event){
		this.circle_radius = event;
		this.refreshMarkers();
	}

	public getInstallers(){
		this.installerService.getInstallers({skip : 0 , top : 3}).subscribe(res => {
			this.installers = this.installers.concat(res.slice(0,3));
			this.data= this.installers;
			this.installerService.toList(res).subscribe(result => {
				this.markers= this.markers.concat(result);
				this.refreshMarkers();
			});
		},()=> {
			this.refreshMarkers();
		}, ()=> {
			this.refreshMarkers();
		})
		
	}

	public refreshMarkers(){
		for(let marker of this.markers){
			marker.invisible = this.distance(this.circle_lat, this.circle_lng,marker.lat,marker.lng) > this.circle_radius;
			
		}
	}

	private degreesToRadians(degrees) {
		return degrees * Math.PI / 180;
	}

	private distance(lat1, lon1, lat2, lon2) : number {
		var earthRadiusMeters = 6371*1000;

		var dLat = this.degreesToRadians(lat2-lat1);
		var dLon = this.degreesToRadians(lon2-lon1);

		lat1 = this.degreesToRadians(lat1);
		lat2 = this.degreesToRadians(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return c * earthRadiusMeters;
	}

	public clickedMarker(marker, index){
		if(index>0){
			var lastSelected = this.selectedInstaller;
			this.selectedInstaller = this.installers[index-1];
			if(lastSelected == this.selectedInstaller)
				this.toggle=!this.toggle;
			else
				this.toggle=true;
		}

	}
}
