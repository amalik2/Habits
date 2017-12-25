import Habit from '../models/habit';

import {removeFromArray} from '../utilities/arrayutilities';

/**
 * Represents a unique user of the application
 */
 
export default class User {
	
	/**
	 * Construct a new user
	 * @param name the new user's unique name
	 */
	constructor(name){
		// the user's unique name
		this.name = name;
		
		// the user's list of created habits
		this.habits = [];
		
		// unique ID
		this.id = ""; // TODO: generate unique ID
	}
	
	/**
	 * @return the user's unique name
	 */
	getName(){
		return this.name;
	}
	
	/**
	 * Add a habit to the user's list of created habits
	 * @param habit the habit to add
	 */
	addHabit(habit){
		this.habits.push(habit);
	}
	
	/**
	 * Remove a habit from the user's list of created habits
	 * @param habit the habit to remove
	 */
	removeHabit(habit){
		removeFromArray(this.habits, habit);
	}
	
	/**
	 * @return list of habits that must be completed today
	 */
	getTodaysTasks(){
		var list = [];
		
		for (var habit of this.habits){
			if (habit.isActiveToday()){
				list.push(habit);
			}
		}
		
		return list;
	}
	
	/**
	 * @return list of habits this user has made
	 */
	getHabits(){
		return this.habits;
	}
	
	/**
	 * @param title the title that the returned habit must have
	 * @return the habit with the specified title if found, or null otherwise
	 */
	getHabitByTitle(title){
		for (var habit of this.habits){
			if (habit.getTitle() === title){
				return habit;
			}
		}
		return null;
	}
}
