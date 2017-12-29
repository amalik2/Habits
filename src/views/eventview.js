import React, { Component } from 'react';

import HabitEvent from '../models/habitevent';
import Location from '../models/location';

import {formatDate, isValid, isBefore, isSameDate} from '../utilities/dateutilities';

/**
 * Allows the user to create a new habit event
 */
 // TODO: google maps for the lat/long selection
 // TODO: photo
export default class EventView extends Component {

	/**
	 * Create a new EventView object
	 * @param props - Contains:
	 * @param {String} habitTitle - the title of the habit this event is a part of
	 * @param {Date} startDate - the date the habit was meant to start on
	 * @param {void} onReturn - callback function for when the view is exited
	 */
	constructor(props){
		super(props);
		this.state = {
			// the title of the habit the event being created is part of
			habitTitle: props.habitTitle,
			// the date the habit was supposed to start on
			habitStartDate: props.startDate,
			
			commentInput: "",
			dateInput: "",
			locationInputLat: 0.0,
			locationInputLong: 0.0,
			photoInput: "",
			
			// function to call when the user clicks confirm or cancel
			onReturn: props.onReturn
		};
		
		this.state.dateInput = formatDate(new Date());
		
		this.onCancelClicked = this.onCancelClicked.bind(this);
		this.onConfirmClicked = this.onConfirmClicked.bind(this);
		this.commentChanged = this.commentChanged.bind(this);
		this.dateChanged = this.dateChanged.bind(this);
		this.latitudeChanged = this.latitudeChanged.bind(this);
		this.longitudeChanged = this.longitudeChanged.bind(this);
	}
	
	/**
	 * Handle the user clicking the cancel button
	 * @param event - the event triggered by the button click
	 */
	onCancelClicked(event){
		this.state.onReturn(null);
	}
	
	/**
	 * Handle the user clicking the confirm button
	 * @param event - the event triggered by the button click
	 * @return {HabitEvent} new habit event if all of the habit event's information was valid, null otherwise
	 */
	onConfirmClicked(event){
		
		let date = new Date(this.state.dateInput);
		if (!isValid(date)){
			alert("The date was invalid");
			return null;
		}
		if (date.getTime() > (new Date()).getTime()){
			alert("The date was in the future");
			return null;
		}
		
		if (isBefore(date, this.state.habitStartDate) && !isSameDate(date, this.state.habitStartDate)){
			alert("The date must be after the habit was supposed to start");
			return null;
		}
		
		let location = new Location(this.state.locationInputLat, this.state.locationInputLong);
		// TODO: if location is invalid, set location = null;
		
		// create new event
		let newEvent = new HabitEvent(this.state.commentInput, date, this.state.photoInput, location);
	
		this.state.onReturn(newEvent);
	}
	
	commentChanged(event){
		this.setState({
			commentInput: event.target.value
		});
	}
	
	dateChanged(event){
		this.setState({
			dateInput: event.target.value
		});
	}
	
	latitudeChanged(event){
		this.setState({
			locationInputLat: event.target.value
		});
	}
	
	longitudeChanged(event){
		this.setState({
			locationInputLong: event.target.value
		});
	}
	
	getConfirmButtonText(){
		return "Create";
	}
	
	render(){
		
		return (
			<div>
			<form>
				<label>
					Comment
					<input type="text" value={this.state.commentInput} onChange={this.commentChanged} />
				</label>
				<br />
				<label>
					Date
					<input type="text" value={this.state.dateInput} onChange={this.dateChanged} />
				</label>
				<br />
				<label>
					Latitude
					<input type="text" value={this.state.locationInputLat} onChange={this.latitudeChanged} />
				</label>
				<br />
				<label>
					Longitude
					<input type="text" value={this.state.locationInputLong} onChange={this.longitudeChanged} />
				</label>
				<br />
			</form>
			<button onClick={this.onConfirmClicked} value="Create">{this.getConfirmButtonText()}</button>
			<button onClick={this.onCancelClicked} value="Return">Return</button>
			</div>
		);
	}

}