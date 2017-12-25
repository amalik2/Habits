import React, { Component } from 'react';

import Habit from '../models/habit';

import CheckableList from './checkablelist';

import {formatDate, isValid} from '../utilities/dateutilities';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class HabitView extends Component {

	constructor(props){
		super(props);
		this.state = {
			// the habit being displayed (can be null)
			habit: props.habit,
			
			dateInputText: "",
			titleInputText: "",
			reasonInputText: "",
			daysOfWeekChecked: [],
			
			onReturn: props.onReturn,
			validateTitle: props.validateTitle
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
		
		this.buttonClicked = this.buttonClicked.bind(this);
		this.onTitleChanged = this.onTitleChanged.bind(this);
		this.onReasonChanged = this.onReasonChanged.bind(this);
		this.onDateChanged = this.onDateChanged.bind(this);
		this.handleDayChanged = this.handleDayChanged.bind(this);
	}
	
	/**
	 * Handle the user clicking the cancel or confirm button
	 * @param event the event triggered by the button click
	 * @return the habit if confirm was clicked, or null otherwise
	 * @return undefined if confirm was clicked but the habit information was invalid
	 */
	buttonClicked(event){
		
		const cancel = event.target.value === "Return";
		
		// the habit that will be returned if cancel is false
		let newHabit = null;
		
		// if the title is invalid, or a duplicate, prevent it from being used
		if (!cancel){
			if ((!this.state.validateTitle(this.state.titleInputText) && (this.state.habit == null || this.state.habit.getTitle() !== this.state.titleInputText))){
				alert("The title was taken, or it was invalid");
				return;
			} else {
			
				let date = new Date(this.state.dateInputText);
				if (!isValid(date)){
					alert("The date was invalid");
					return;
				}
				
				// days of the week the habit will occur on
				let days = [];
				for (let i = 0; i < this.state.daysOfWeekChecked.length; ++i){
					if (this.state.daysOfWeekChecked[i]){
						days.push(i);
					}
				}
				if (days.length === 0){
					alert("No days of the week were selected");
					return;
				}
				
				// create new habit
				if (this.state.habit == null){
					newHabit = new Habit(this.state.titleInputText, this.state.reasonInputText, date, days);
					this.setState({
						habit: newHabit
					});
				} else {
					// update the old habit's details
					this.state.habit.setTitle(this.state.titleInputText);
					this.state.habit.setReason(this.state.reasonInputText);
					this.state.habit.setStartDate(date);
					this.state.habit.setDaysOfWeek(days);
					newHabit = this.state.habit;
				}
			}
		}
		
		this.state.onReturn(cancel ? null : newHabit);
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
		const index = daysOfWeek.indexOf(day);
		
		list[index] = !list[index];
		
		this.setState({
			daysOfWeekChecked: list
		});
	}
	
	render(){
		
		var buttonText = (this.state.habit == null) ? "Create" : "Edit";
		
		return (
			<div>
			<form>
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
					<CheckableList items={daysOfWeek} checked={this.state.daysOfWeekChecked} onClick={(day) => this.handleDayChanged(day)} />
				</label>
				<br />
			</form>
			<button onClick={this.buttonClicked} value="Create">{buttonText}</button>
			<button onClick={this.buttonClicked} value="Return">Return</button>
			</div>
		);
	}

}