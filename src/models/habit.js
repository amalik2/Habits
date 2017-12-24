import {removeFromArray} from '../utilities/arrayutilities';

import HabitEvent from './habitevent';

/**
 * A habit created by a user of the application
 */
export default class Habit {

	/**
	 * Construct a new habit
	 * @param title the habit's title
	 * @param reason the user's reason for creating the habit
	 * @param startDate the date the user wants to start the habit at
	 * @param daysOfWeek array of what days of the week the habit must be completed on (0=Sunday, 6=Saturday)
	 */
	constructor(title, reason, startDate, daysOfWeek){
		// the habit's name
		this.title = title;
		
		// reason for creating this habit
		this.reason = reason;
		
		// the date the habit is started on
		this.startDate = startDate;
		
		// what days of the week the habit must be completed on (0=Sunday, 6=Saturday)
		this.daysOfWeek = daysOfWeek;
		
		// unique ID
		this.id = ""; // TODO: generate unique ID
		
		// completions of this habit
		this.events = [];
	}
	
	setStartDate(start){
		this.startDate = start;
	}

	getStartDate(){
		return this.startDate;
	}
	
	getTitle(){
		return this.title;
	}
	
	setTitle(title){
		this.title = title;
	}
	
	/**
	 * @return the date this habit was last completed at (or null, if it has never been completed)
	 */
	getLastCompletionDate(){
		
		if (this.events.length === 0)
			return null;
		
		return this.events[this.events.length - 1].getDate();
	}
	
	/**
	 * @return whether this habit needs to be completed today
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
	
	getReason(){
		return this.reason;
	}
	
	setReason(reason){
		this.reason = reason;
	}
	
	getEvents(){
		return this.events;
	}
	
	addEvent(event){
		this.events.push(event);
	}
	
	removeEvent(event){
		removeFromArray(this.events, event);
	}
	
}