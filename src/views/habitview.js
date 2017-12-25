import React, { Component } from 'react';

import Habit from '../models/habit';

import CheckableList from './checkablelist';

import {formatDate} from '../utilities/dateutilities';

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class HabitView extends Component {

	constructor(props){
		super(props);
		this.state = {
			// the habit being displayed (can be null)
			habit: props.habit,
			
			dateInputText: "",
			titleInputText: "",
			reasonInputText: "",
			daysOfWeekChecked: []
		};
		
		// initialize all days of the week to be unselected
		for (let i = 0; i < 7; ++i)
			this.state.daysOfWeekChecked.push(false);
		
		if (this.state.habit != null){
			this.state.dateInputText = formatDate(this.state.habit.getStartDate());
			this.state.titleInputText = this.state.habit.getTitle();
			this.state.reasonInputText = this.state.habit.getReason();
			
			for (let i of this.state.habit.getDaysOfWeek())
				this.state.daysOfWeekChecked[i] = true;
			
		}
		
		this.save = this.save.bind(this);
		this.onTitleChanged = this.onTitleChanged.bind(this);
		this.onReasonChanged = this.onReasonChanged.bind(this);
		this.onDateChanged = this.onDateChanged.bind(this);
		this.handleDayChanged = this.handleDayChanged.bind(this);
	}
	
	getHabit(){
		return this.state.habit;
	}
	
	save(event){
		// TODO: make sure title is unique
		// TODO: make sure date is valid
		if (this.state.habit == null){
			
		} else {
			
		}
	}
	
	onTitleChanged(event){
		this.setState({
			titleInputText: event.target.value
		});
	}
	
	onReasonChanged(event){
		this.setState({
			reasonInputText: event.target.value
		});
	}
	
	onDateChanged(event){
		this.setState({
			dateInputText: event.target.value
		});
	}
	
	handleDayChanged(day){
		
		var list = this.state.daysOfWeekChecked;
		const index = DAYS_OF_WEEK.indexOf(day);
		
		list[index] = !list[index];
		
		this.setState({
			daysOfWeekChecked: list
		});
	}
	
	render(){
		
		var buttonText = (this.state.habit == null) ? "Create" : "Edit";
		
		return (
			<form onSubmit={this.save}>
				<label>
					Title
					<input type="textbox" value={this.state.titleInputText} onChange={this.onTitleChanged} />
				</label>
				<br />
				<label>
					Reason
					<input type="textbox" value={this.state.reasonInputText} onChange={this.onReasonChanged} />
				</label>
				<br />
				<label>
					Start Date
					<input type="date" value={this.state.dateInputText} onChange={this.onDateChanged} />
				</label>
				<br />
				<label>
					Frequency
					<br />
					<CheckableList items={DAYS_OF_WEEK} checked={this.state.daysOfWeekChecked} onClick={this.handleDayChanged} />
				</label>
				<br />
				<input type="submit" value={buttonText} />
			</form>
		);
	}

}