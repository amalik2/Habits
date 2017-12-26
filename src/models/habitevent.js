import Queryable from './queryable';

/**
 * Represents a successful completion of a habit
 */
export default class HabitEvent extends Queryable {

	/**
	 * Construct a new HabitEvent object
	 * @param {String} comment - text that describes the event
	 * @param {Date} date - the date the event was completed on
	 * @param {String} photo - an optional photo attached to the event
	 * @param {Location} location - an optional location the event was completed at
	 */
	constructor(comment, date, photo, location){
		super();
		
		// {String} the comment attached to this event
		this.comment = comment;
		
		// {Date} the date this event was completed on
		this.date = date;
		
		// {String} an optional photo attached to this event
		this.photo = photo;
		
		// {Location} the location this event was completed at
		this.location = location;
		
		// {String} the unique ID of the habit containing this event
		this.habitId = "";
	}
	
	/**
	 * @returns {String} the comment attached to this event
	 */
	getComment(){
		return this.comment;
	}
	
	/**
	 * Sets the comment attached to this event
	 * @param {String} comment - the comment to attach to this event
	 */
	setComment(comment){
		this.comment = comment;
	}
	
	/**
	 * @return {Date} the date this event was completed on
	 */
	getDate(){
		return this.date;
	}
	
	/**
	 * Sets the date this event was completed at
	 * @param {Date} date - the date this event was completed at
	 */
	setDate(date){
		this.date = date;
	}
	
	/**
	 * @return {String} the photo attached to this event
	 */
	getPhoto(){
		return this.photo;
	}
	
	/**
	 * Sets the photo attached to this event
	 * @param {String} photo - the photo attached to this event
	 */
	setPhoto(photo){
		this.photo = photo;
	}
	
	/**
	 * @return {Location} the location this event was completed at
	 */
	getLocation(){
		return this.location;
	}
	
	/**
	 * Sets the location this event was completed at
	 * @param {Location} location - the location the event was completed at
	 */
	setLocation(location){
		this.location = location;
	}
	
	/**
	 * Sets the ID of the habit containing this event
	 * @param {String} habitId - the ID of the habit
	 */
	setHabitId(habitId){
		this.habitId = habitId;
	}
	
	/**
	 * @return {String} the ID of the habit containing this event
	 */
	getHabitId(){
		return this.habitId;
	}
	
}