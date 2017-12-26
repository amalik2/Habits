import React, { Component } from 'react';

import './sidebar.css';

import TodaysTasks from '../views/todaystasks';
import Sidebar from './sidebar';
import Habits from './habits';
import EventView from './eventview';
import HabitHistory from './habithistory';
import FollowRequests from './followrequests';

import User from '../models/user';
import Habit from '../models/habit';
import HabitEvent from '../models/habitevent';
import Location from '../models/location';

import {isSameDate} from '../utilities/dateutilities';

// options in the side bar menu
const sideBarOptions = ["Home","Habits","Habit History", "Followed Users", "Follow Requests", "Search Users", "Sign Out"];

/**
 * Displays information the user sees immediately after signing in
 */
export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			// the currently signed in user
			user: new User(props.user),
			// the index of the menu the user is currently viewing (corresponds to an option in sideBarOptions)
			menuIndex: 0,
			
			// the function to call when the user selects the sign out button
			signOut: props.signOut,
			
			// title of the habit the user is currently creating an event for (empty string means none)
			completingHabit: ""
		};
		
		for (var i = 0; i < 25; ++i)
			this.state.user.addHabit(new Habit("First" + i, "no reason", new Date(), [0, 1,2,3]));
		
		this.onSideBarItemClicked = this.onSideBarItemClicked.bind(this);
		this.onTodaysTaskChecked = this.onTodaysTaskChecked.bind(this);
		this.onEventReturn = this.onEventReturn.bind(this);
	}
	
	onSideBarItemClicked(item){
		
		const index = sideBarOptions.findIndex((menu) => (menu === item))
		
		// the last option is the sign out button
		if (index === sideBarOptions.length - 1){
			this.state.signOut();
		} else {
			// update the index of the currently selected menu to the new item
			this.setState({
					menuIndex: index
				}
			);
		}
	}
	
	onTodaysTaskChecked(habitName){
		
		// already completed today, don't allow it to be completed again
		if (isSameDate(this.state.user.getHabitByTitle(habitName).getLastCompletionDate(), new Date())){
			return;
		}
		
		this.setState({
			completingHabit: habitName
		});
	}
	
	onEventReturn(event){
		if (event != null){
			this.state.user.getHabitByTitle(this.state.completingHabit).addEvent(event);
		}
		this.setState({
			completingHabit: ""
		});
	}
	
	/** Add all items to display for the current page to the input list
	 * @param items the list of all items to display
	 */
	getUniqueItemsToDisplay(items){
		
		const index = this.state.menuIndex;
		
		if (index === 0){ // home
		
			if (this.state.completingHabit !== ""){
				items.push(<EventView key="event" event={null} habitTitle={this.state.completingHabit} startDate={this.state.user.getHabitByTitle(this.state.completingHabit).getStartDate()} onReturn={this.onEventReturn} />);
			} else {
				items.push(
					<p key="welcome" className="App-intro">
					  Welcome, {this.state.user.getName()}!
					</p>,
					<TodaysTasks key="tasks" tasks={this.state.user.getTodaysTasks()} onChecked={this.onTodaysTaskChecked} />
				);
			}
		} else if (index === 1){		// habits
			items.push(<Habits key="habits" user={this.state.user} />);
		}  else if (index === 2){		// habit history
			items.push(<HabitHistory key="history" user={this.state.user} />);
		}  else if (index === 3){		// followed users
		
		}  else if (index === 4){		// follow requests
			items.push(<FollowRequests key="requests" user={this.state.user} />);
		} else if (index === 5){		// search users
		
		} else {						// shouldn't happen
		
		}
		
	}
	
	render(){
		
		var display = [<Sidebar items={sideBarOptions} onItemClicked={this.onSideBarItemClicked} />];
		this.getUniqueItemsToDisplay(display);
		
		return (
			<div className="App">
				{display}
			</div>
		);
	}
}