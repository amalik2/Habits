
/**
 * Represents a successful completion of a habit
 */
export default class HabitEvent {

	/**
	 * Create a new habit event
	 * @param comment is text that describes the event
	 * @param date is the date the event was completed on
	 * @param photo is an optional photo attached to the event
	 * @param location is an optional location the event was completed at
	 */
	constructor(comment, date, photo, location){
		this.comment = comment;
		this.date = date;
		this.photo = photo;
		this.location = location;
	}
	
	getComment(){
		return this.comment;
	}
	
	setComment(comment){
		this.comment = comment;
	}
	
	getDate(){
		return this.date;
	}
	
	setDate(date){
		this.date = date;
	}
	
	getPhoto(){
		return this.photo;
	}
	
	setPhoto(photo){
		this.photo = photo;
	}
	
	getLocation(){
		return this.location;
	}
	
	setLocation(location){
		this.location = location;
	}

}