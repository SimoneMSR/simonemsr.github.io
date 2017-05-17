import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  public stringifyParams(object) : string{
  	var retval = [];
  	for (let key of Object.keys(object))
  		retval.push(key + "=" + object[key]);
  	return retval.join('&');
  }

  public stringifyObjectValues(object) : string{
  	var retval = [];
  	for (let key of Object.keys(object)){
  		if(object[key])
 	 		retval.push(object[key])
  	}
  	return retval.join('+');
  }

}
