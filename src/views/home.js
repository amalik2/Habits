import React, { Component } from 'react';

import './sidebar.css';

import TodaysTasks from '../views/todaystasks';
import Sidebar from './sidebar';
import Habits from './habits';

import User from '../models/user';
import Habit from '../models/habit';
import HabitEvent from '../models/habitevent';
import Location from '../models/location';

const sideBarOptions = ["Home","Habits","Habit History", "Followed Users", "Follow Requests", "Search Users"];

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			// the currently signed in user
			user: new User(props.user),
			// the index of the menu the user is currently viewing (corresponds to an option in sideBarOptions)
			menuIndex: 0
		};
		
		for (var i = 0; i < 25; ++i)
			this.state.user.addHabit(new Habit("First" + i, "no reason", new Date(), [0, 1,2,3]));
		var habits = this.state.user.getHabits();
		habits[habits.length - 1].addEvent(new HabitEvent("No Comment", new Date(), null, new Location(25.0, 55.0)));
		
		this.onSideBarItemClicked = this.onSideBarItemClicked.bind(this);
		this.onTodaysTaskChecked = this.onTodaysTaskChecked.bind(this);
	}
	
	onSideBarItemClicked(item){
		// update the index of the currently selected menu to the new item
		this.setState({
				menuIndex: sideBarOptions.findIndex((menu) => (menu === item))
			}
		);
	}
	
	onTodaysTaskChecked(habitName){
		// TODO: create event page
	}
	
	render(){
		
		const index = this.state.menuIndex;
		
		if (index === 0){				// home
			return (<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				<p className="App-intro">
				  Welcome, {this.state.user.getName()}!
				</p>
				<TodaysTasks tasks={this.state.user.getTodaysTasks()} onChecked={this.onTodaysTaskChecked} />
			  </div>);
		} else if (index === 1){		// habits
			return (
				<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				
				<Habits user={this.state.user} />
				</div>
			);
		}  else if (index === 2){		// habit history
			return (
				<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				</div>
			);
		}  else if (index === 3){		// followed users
			return (
				<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				</div>
			);
		}  else if (index === 4){		// follow requests
			return (
				<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				</div>
			);
		} else if (index === 5){		// search users
			return (
				<div className="App">
				<Sidebar items={sideBarOptions}
					onItemClicked={this.onSideBarItemClicked} />
				</div>
			);
		} else {						// shouldn't happen
			return (
				<p>Error</p>
			);
		}
	}
}