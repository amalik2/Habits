import Habit from '../models/habit';

import {removeFromArray} from '../utilities/arrayutilities';

import Queryable from './queryable';

/**
 * Represents a unique user of the application
 */
 
export default class User extends Queryable {
	
	/**
	 * Construct a new user
	 * @param name the new user's unique name
	 */
	constructor(name){
		super();
		// the user's unique name
		this.name = name;
		
		// the user's list of created habits
		this.habits = [];
		
		// unique id of all users that this user follows
		this.followedUsers = [];
		
		// unique id of all users that sent this user a follow request
		this.followRequests = [];
	}
	
	/**
	 * Return a list of all users that this user has follow requests from
	 */
	getFollowRequests(){
		// TODO: query from DB using ids
		return this.followRequests;
	}
	
	/**
	 * Return a list of all users that this user is following
	 */
	getFollowedUsers(){
		// TODO: query from DB using ids
		return this.followedUsers;
	}
	
	/**
	 * Get whether this user is following the specified user
	 * @param user the user to check whether this user is following or not
	 * @return whether this user is following the specified user
	 */
	isFollowing(user){
		return this.followedUsers.indexOf(user.getId()) !== -1;
	}
	
	/**
	 * Have this user unfollow the specified user
	 * @param user the user to unfollow
	 */
	unfollow(user){
		removeFromArray(this.followedUsers, user.getId());
	}
	
	/**
	 * Accept the follow request from the specified user
	 * @param user the user this user should accept the request from
	 */
	acceptFollowRequest(user){
		user.followedUsers.push(this.getId());
		removeFromArray(this.followRequests, user.getId());
	}
	
	/**
	 * Remove the follow request from the specified user
	 * @param user the user this user should remove the request from
	 */
	removeFollowRequest(user){
		removeFromArray(this.followRequests, user.getId());
	}
	
	/**
	 * Remove the follow request from the specified user
	 * @param id the id of the user this user should remove the request from
	 */
	removeFollowRequestById(id){
		removeFromArray(this.followRequests, id);
	}
	
	/**
	 * Add a follow request from the specified user
	 * @param user the user this user should add a follow request from
	 */
	addFollowRequest(user){
		this.followRequests.push(user.getId());
	}
	
	/**
	 * Get whether this user has a follow request from the specified user
	 * @param user the user to check whether this user has a follow request from
	 * @return whether this user has a follow request from the specified user
	 */
	hasFollowRequest(user){
		return this.followRequests.indexOf(user.getId()) !== -1;
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
