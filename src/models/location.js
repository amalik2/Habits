/**
 * Represents a physical location with latitude and longitude coordinates
 */
export default class Location {

	constructor(latitude, longitude){
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	getLatitude(){
		return this.latitude;
	}
	
	setLatitude(latitude){
		this.latitude = latitude;
	}
	
	getLongitude(){
		return this.longitude;
	}
	
	setLongitude(longitude){
		this.longitude = longitude;
	}

}