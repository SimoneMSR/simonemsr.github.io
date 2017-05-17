
export class User {
	public id: number;
	public email : string;
	public name : string;
	public surname : string;
	public image : string;
	public languageCode : string;
	public telephone : string;
	public roles : Role[];
	public enabledLogins : string[];
	public emailConfirmed : boolean;

	constructor(){
		this.roles = [];
		this.enabledLogins = [];
	}
}

export enum Role {
	ADMIN, USER,INSTALLER
}

export class Installer extends User {
	public paymentTypes : string[];
	public iban : string;
	public paypal : string;
	public company : string;
	public country : string;
	public city : string;
	public zipcode : string;
	public address : string;
	public website : string;
	public distributor : string;
	public cost_wifi : number;
	public cost_ethernet : number;
	public cost_cam : number;
	public distance : number;

	constructor(){
		super();
		this.paymentTypes = [];
	}

}

export class Address {
	public country : string;
	public city : string;
	public zipcode : string;
	public address : string;


	constructor(i : Installer){
		this.country = i.country;
		this.city = i.city;
		this.address = i.address;
		this.zipcode = i.zipcode;
	}
}