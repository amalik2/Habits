import React, { Component } from 'react';

import CheckableList from './checkablelist';
import {isSameDate} from '../utilities/dateutilities'

/**
 * Displays the habits the user needs to do today as a checkable list
 */
export default class TodaysTasks extends Component {

	constructor(props){
		super(props);
		this.state = {
			habits: props.tasks,
			onChecked: props.onChecked
		};
		
		this.onCheckChanged = this.onCheckChanged.bind(this);
	}
	
	/**
	 * Event that is fired when the habit with the specified name is checked
	 */
	onCheckChanged(name){
		this.state.onChecked(name);
	}
	
	render(){
	
		var today = new Date();
		var habitNames = this.state.habits.map(habit => habit.getTitle());
		var checked = this.state.habits.map(habit => isSameDate(habit.getLastCompletionDate(), today));
		return (
			<div>
				<h2>TODAY'S TASKS</h2>
				<CheckableList items={habitNames} checked={checked} onClick={(name) => this.onCheckChanged(name)} />
			</div>
		);
	
	}

}