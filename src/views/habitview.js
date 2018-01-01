import React, { Component } from 'react';

import Habit from '../models/habit';

import CheckableList from './checkablelist';

import {formatDate, isValid} from '../utilities/dateutilities';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Allows the user to create a new habit
 */
export default class HabitView extends Component {

	/**
	 * Create a new HabitView object
	 * @param props - Contains:
	 * @param {void} onReturn - callback function when this view is exited
	 * @param {boolean(String)} validateTitle - callback function for validating whether a habit title is valid or not
	 */
	constructor(props){
		super(props);
		this.state = {
			// {String} the input text state for the date field
			dateInputText: "",
			// {String} the input text state for the title field
			titleInputText: "",
			// {String} the input text state for the reason field
			reasonInputText: "",
			// {[boolean]} status of whether each day of the week is checked or not
			daysOfWeekChecked: [],
			
			// {void} callback function when this view is exited
			onReturn: props.onReturn,
			
			// {boolean(String)} callback function for validating whether a habit title is valid or not
			validateTitle: props.validateTitle
		};
		
		// initialize all days of the week to be unselected
		for (let i = 0; i < 7; ++i)
			this.state.daysOfWeekChecked.push(false);
		
		this.state.dateInputText = formatDate(new Date());
		
		this.onCancelClicked = this.onCancelClicked.bind(this);
		this.onConfirmClicked = this.onConfirmClicked.bind(this);
		this.onTitleChanged = this.onTitleChanged.bind(this);
		this.onReasonChanged = this.onReasonChanged.bind(this);
		this.onDateChanged = this.onDateChanged.bind(this);
		this.handleDayChanged = this.handleDayChanged.bind(this);
	}
	
	/**
	 * Handle the user clicking the cancel button
	 * @param event - the event triggered by the button click
	 */
	onCancelClicked(event){
		this.state.onReturn(null);
	}
	
	/**
	 * @return {Boolean} whether the entered habit title can be used to create a new habit or not
	 */
	validateHabitTitle(){
		return this.state.validateTitle(this.state.titleInputText);
	}
	
	/**
	 * @return {Boolean} whether the entered habit details are valid or not
	 */
	validateHabitDetails(){
		
		if (!this.validateHabitTitle()){
			alert("The title was taken, or it was invalid");
			return false;
		}
		
		let date = new Date(this.state.dateInputText);
		if (!isValid(date)){
			alert("The date was invalid");
			return false;
		}
		
		// days of the week the habit will occur on
		let days = this.getSelectedDays();
		if (days.length === 0){
			alert("No days of the week were selected");
			return false;
		}
		
		return true;
	}
	
	/**
	 * @return {[Number]} the days of the week this habit is selected to occur on
	 */
	getSelectedDays(){
		let days = [];
		for (let i = 0; i < this.state.daysOfWeekChecked.length; ++i){
			if (this.state.daysOfWeekChecked[i]){
				days.push(i);
			}
		}
		return days;
	}
	
	/**
	 * Handle the user clicking the confirm button
	 * @param event - the event triggered by the button click
	 */
	onConfirmClicked(event){
		if (this.validateHabitDetails()){
			this.state.onReturn(
				new Habit(this.state.titleInputText, this.state.reasonInputText, new Date(this.state.dateInputText), this.getSelectedDays())
			);
		}
	}
	
	/**
	 * Handle the habit title input field being changed
	 * @param event - the input change event triggering this call
	 */
	onTitleChanged(event){
		this.setState({
			titleInputText: event.target.value
		});
	}
	
	/**
	 * Handle the habit reason input field being changed
	 * @param event - the input change event triggering this call
	 */
	onReasonChanged(event){
		this.setState({
			reasonInputText: event.target.value
		});
	}
	
	/**
	 * Handle the habit date input field being changed
	 * @param event - the input change event triggering this call
	 */
	onDateChanged(event){
		this.setState({
			dateInputText: event.target.value
		});
	}
	
	/**
	 * Handle one of the days the habit will take place on being changed
	 * @param {Number} day - the day that had it's status changed
	 */
	handleDayChanged(day){
		
		var list = this.state.daysOfWeekChecked;
		const index = daysOfWeek.indexOf(day);
		
		list[index] = !list[index];
		
		this.setState({
			daysOfWeekChecked: list
		});
	}
	
	/**
	 * @return {String} the text to display on the confirm button
	 */
	getConfirmButtonText(){
		return "Create";
	}
	
	render(){
		
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
					<input type="textbox" value={this.state.dateInputText} onChange={this.onDateChanged} />
				</label>
				<br />
				<label>
					Frequency
					<br />
					<CheckableList items={daysOfWeek} checked={this.state.daysOfWeekChecked} onClick={(day) => this.handleDayChanged(day)} />
				</label>
				<br />
			</form>
			<button onClick={this.onConfirmClicked} value="Create">{this.getConfirmButtonText()}</button>
			<button onClick={this.onCancelClicked} value="Return">Return</button>
			</div>
		);
	}
}