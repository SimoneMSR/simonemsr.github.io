import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Installer, Address, MapModule, Marker} from "./map";
import {Http} from "@angular/http";
import {UtilsService} from "./core";

@Injectable()
export class InstallerService {

	private baseUrl : string;
	constructor(private http : Http,
		private utils : UtilsService) { 
		if(window.location.hostname == '172.20.1.140' || window.location.hostname =='localhost')
			this.baseUrl =  "http://172.20.1.140:8080/comelit-iot-server";
		else
			this.baseUrl =  "/comelit-iot-server";}

		public  getInstallers(params) :  Observable<Installer[]>{
			return this.http.post(this.baseUrl + "/preorder", params)
			.map(res => <Installer[]> res.json())
			.catch(this.serverError);
		}

		protected serverError(err: any) {
			if(err instanceof Response) {
				return Observable.throw( err.json() || 'backend server error');
				// if you're using lite-server, use the following line
				// instead of the line above:
				//return Observable.throw(err.text() || 'backend server error');
			}
			return Observable.throw(err || 'backend server error');
		}

		public to(installer : Installer) : Observable<Marker>{
			var retval = new Marker();
			retval.label = installer.name;
			return Observable.from(this.getCoordinatesFromInstaller(installer))
			.map(coord => {
				if(coord){
					retval.lat = coord.lat;
					retval.lng = coord.lng;
				}
				return retval;
			})
			.catch((err) => {
				return Observable.of(null);
			})
		}

		public toList(installers : Installer[]) : Observable<Marker[]>{
			var retval =  [];
			var requests : Observable<Marker> = Observable.of(null);
			return Observable.create( observer => {
				for(let installer of installers){
					requests = requests.concat(this.to(installer).do(marker => {
							if(marker)
								retval.push(marker);
						}, () => {
							console.log("ciao");
						})
					);
				}
				requests.subscribe(undefined, undefined, () => {
					observer.next(retval);
					observer.complete();
				})

			});
		}

		public  getCoordinatesFromString(address : string) : Observable<any>{
			return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
				+ address + "&key=" + MapModule.API_KEY)
			.map(res => {
				var response = res.json();
				if(response.results.length>0){
					var first = response.results[0];
					return first.geometry.location;
				}else{
					return null;
				}
			})
		}

		public  getCoordinatesFromInstaller(installer : Installer) : Observable<any>{
			var address = this.utils.stringifyObjectValues(new Address(installer));
			return this.getCoordinatesFromString(address);

		}

	}
