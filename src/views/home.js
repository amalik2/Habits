import React, { Component } from 'react';

import './sidebar.css';

import User from '../models/user';
import TodaysTasks from '../views/todaystasks';
import Sidebar from './sidebar';
import Habit from '../models/habit';

import HabitEvent from '../models/habitevent';
import Location from '../models/location';

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: new User(props.user)
		};
		
		for (var i = 0; i < 25; ++i)
			this.state.user.addHabit(new Habit("First" + i, "no reason", new Date(), [0, 1,2,3]));
		var habits = this.state.user.getHabits();
		habits[habits.length - 1].addEvent(new HabitEvent("No Comment", new Date(), null, new Location(25.0, 55.0)));
	}
	
	render(){
		return (<div className="App">
				<Sidebar items={["Home","Habits","Habit History", "Followed Users", "Follow Requests", "Search Users"]} />
				<p className="App-intro">
				  Welcome, {this.state.user.getName()}!
				</p>
				<TodaysTasks tasks={this.state.user.getTodaysTasks()} />
				<button onClick='toCreateHabit()'>Create Habit</button>
			  </div>);
	}
}