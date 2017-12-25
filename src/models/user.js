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
	 * Remove the habit with the specified ID
	 * @param id the ID of the habit to delete
	 */
	removeHabitById(id){
		const length = this.habits.length;
		for (var i = 0; i < length; ++i){
			if (this.habits[i].getId() === id){
				this.habits.splice(i, 1);
				return;
			}
		}
	}
	
	/**
	 * Get a habit by it's unique ID
	 * @param id the ID of the habit to get
	 * @return the habit with the specified ID if found, or null otherwise
	 */
	getHabitById(id){
		for (var habit of this.habits){
			if (habit.getId() === id){
				return habit;
			}
		}
		return null;
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
	
	/**
	 * Remove the habit with the specified title
	 * @param title the title that the returned habit must have
	 */
	removeHabitByTitle(title){
		const length = this.habits.length;
		for (var i = 0; i < length; ++i){
			if (this.habits[i].getTitle() === title){
				this.habits.splice(i, 1);
				return;
			}
		}
	}
	
	/**
	 * Get the user's list of all completed habit events, with the most recent ones coming first
	 * @return the list of the user's habit events, sorted in descending order by date
	 */
	getHabitHistory(){
		var events = []
		for (let habit of this.habits){
			let completions = habit.getEvents();
			for (let event of completions)
				events.push(event);
		}
		
		events.sort((event1, event2) => event1.getDate() < event2.getDate());
		return events;
	}
	
}
