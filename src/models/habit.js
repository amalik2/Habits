import {removeFromArray} from '../utilities/arrayutilities';
import {formatDate} from '../utilities/dateutilities';

import HabitEvent from './habitevent';
import Queryable from './queryable';

/**
 * A habit created by a user of the application
 */
export default class Habit extends Queryable {

	/**
	 * Construct a new habit
	 * @param {String} title the habit's title
	 * @param {String} reason the user's reason for creating the habit
	 * @param {Date} startDate the date the user wants to start the habit at
	 * @param {[Int]} daysOfWeek array of what days of the week the habit must be completed on (0=Sunday, 6=Saturday)
	 */
	constructor(title, reason, startDate, daysOfWeek){
		super();
		// the habit's name
		this.title = title;
		
		// reason for creating this habit
		this.reason = reason;
		
		// the date the habit is started on
		this.startDate = startDate;
		
		// what days of the week the habit must be completed on (0=Sunday, 6=Saturday)
		this.daysOfWeek = daysOfWeek;
		
		// completions of this habit
		this.events = [];
	}
	
	/**
	 * Set the date this habit should start on
	 * @param {Date} start the new start date of the habit
	 */
	setStartDate(start){
		this.startDate = start;
	}

	/**
	 * @return {Date} the date this habit should start on
	 */
	getStartDate(){
		return this.startDate;
	}
	
	/**
	 * @return {String} the title of this habit
	 */
	getTitle(){
		return this.title;
	}
	
	/**
	 * Sets the habit's title
	 * @param {String} title the title of the habit
	 */
	setTitle(title){
		this.title = title;
	}
	
	/**
	 * @return {Date} the date this habit was last completed at (or null, if it has never been completed)
	 */
	getLastCompletionDate(){
		
		if (this.events.length === 0)
			return null;
		
		return this.events[this.events.length - 1].getDate();
	}
	
	/**
	 * @return {boolean} whether this habit needs to be completed today
	 */
	isActiveToday(){
		
		var todayDate = new Date();
		var today = todayDate.getTime();
		var todayDayNumber = todayDate.getDay();
		
		for (var i = 0; i < this.daysOfWeek.length; ++i){
			
			// not started yet
			if (this.startDate.getTime() > today)
				continue;
			
			if (this.daysOfWeek[i] === todayDayNumber){
				return true;
			}
		}
		
		return false;
	}
	
	/**
	 * @return {String} the reason why this habit was made
	 */
	getReason(){
		return this.reason;
	}
	
	/**
	 * Sets the reason why this habit was created
	 * @param {String} reason the creator's reason for making this habit
	 */
	setReason(reason){
		this.reason = reason;
	}
	
	/**
	 * @return {[HabitEvent]} the list of completed habit events falling under this habit
	 */
	getEvents(){
		return this.events;
	}
	
	/**
	 * Adds a new successful habit completion to this habit
	 * @param {HabitEvent} the event that was completed
	 */
	addEvent(event){
		event.setHabitId(this.getId());
		this.events.push(event);
	}
	
	/**
	 * Removes a habit completion from this habit
	 * @param {HabitEvent} the event that should be removed
	 */
	removeEvent(event){
		removeFromArray(this.events, event);
	}
	
	/**
	 * @return {Number} the number of times this habit was completed
	 */
	getTimesCompleted(){
		return this.events.length;
	}
	
	/**
	 * Gets a string representation of the last date this event was completed at
	 * @return {String} the last completion date as a string, or "Never" if it has never been completed
	 */
	getLastCompletionString(){
		const lastCompletion = this.getLastCompletionDate();
		if (lastCompletion == null)
			return "Never";
		return formatDate(lastCompletion);
	}
	
	/**
	 * Gets the days of the weke this habit must occur on as a list of integers
	 * Sunday=0, Saturday=6
	 * @return {[Int]} list of all days of the week this habit must occur on
	 */
	getDaysOfWeek(){
		return this.daysOfWeek;
	}
	
	/**
	 * Set the days of the weke this habit must occur on as a list of integers
	 * Sunday=0, Saturday=6
	 * @param {[Int]} days the list of all days of the week this habit must occur on
	 */
	setDaysOfWeek(days){
		this.daysOfWeek = days;
	}
	
}