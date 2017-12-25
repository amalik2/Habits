import React, { Component } from 'react';

import Habit from '../models/habit';

export default class HabitView extends Component {

	constructor(props){
		super(props);
		this.state = {
			// the habit being displayed
			habit: props.habit,
			
			// whether the habit being displayed is a new one or not
			newHabit: false
		};
		
		if (this.state.habit == null){
			this.state.habit = new Habit("", "", new Date(), []);
			this.state.newHabit = true;
		}
		
		this.save = this.save.bind(this);
	}
	
	getHabit(){
		return this.state.habit;
	}
	
	save(event){
		
	}
	
	render(){
		
		return (
			<form onSubmit={this.save}>
				<label>
					Name
					<input type="textbox" value={this.state.habit.getTitle()} onChange={(title) => this.state.habit.setTitle(title)} />
				</label>
			</form>
		);
	}

}