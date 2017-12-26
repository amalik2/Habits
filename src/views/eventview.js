import React, { Component } from 'react';

import HabitEvent from '../models/habitevent';
import Location from '../models/location';

import {formatDate, isValid, isBefore, isSameDate} from '../utilities/dateutilities';

/**
 * Create a new habit event, or edit an existing one's details
 */
 // TODO: google maps for the lat/long selection
 // TODO: photo
export default class EventView extends Component {

	constructor(props){
		super(props);
		this.state = {
			// the event being displayed
			event: props.event,
			// the title of the habit the event being viewed is part of
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
		
		if (this.state.event != null){
			this.state.commentInput = this.state.event.getComment();
			this.state.dateInput = formatDate(this.state.event.getDate());
			this.state.locationInputLat = this.state.event.getLocation().getLatitude();
			this.state.locationInputLong = this.state.event.getLocation().getLongitude();
		} else {
			this.state.dateInput = formatDate(new Date());
		}
		
		this.buttonClicked = this.buttonClicked.bind(this);
		this.commentChanged = this.commentChanged.bind(this);
		this.dateChanged = this.dateChanged.bind(this);
		this.latitudeChanged = this.latitudeChanged.bind(this);
		this.longitudeChanged = this.longitudeChanged.bind(this);
	}
	
	/**
	 * Handle the user clicking the cancel or confirm button
	 * @param event the event triggered by the button click
	 * @return the event if confirm was clicked, or null otherwise
	 * @return undefined if confirm was clicked but the event information was invalid
	 */
	buttonClicked(event){
		
		const cancel = event.target.value === "Return";
		
		// the event that will be returned if cancel is false
		let newEvent = null;
		
		// if the title is invalid, or a duplicate, prevent it from being used
		if (!cancel){
			
			let date = new Date(this.state.dateInput);
			if (!isValid(date)){
				alert("The date was invalid");
				return;
			}
			if (date.getTime() > (new Date()).getTime()){
				alert("The date was in the future");
				return;
			}
			
			if (isBefore(date, this.state.habitStartDate) && !isSameDate(date, this.state.habitStartDate)){
				alert("The date must be after the habit was supposed to start");
				return;
			}
			
			let location = new Location(this.state.locationInputLat, this.state.locationInputLong);
			// TODO: if location is invalid, set location = null;
			
			// create new event
			if (this.state.event == null){
				newEvent = new HabitEvent(this.state.commentInput, date, this.state.photoInput, location);
				this.setState({
					event: newEvent
				});
			} else {
				// update the old habit's details
				this.state.event.setComment(this.state.commentInput);
				this.state.event.setPhoto(this.state.photoInput);
				this.state.event.setDate(date);
				this.state.event.setLocation(location);
				newEvent = this.state.event;
			}
		}
		
		this.state.onReturn(cancel ? null : newEvent);
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
	
	render(){
		var buttonText = (this.state.event == null) ? "Create" : "Edit";
		
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
			<button onClick={this.buttonClicked} value="Create">{buttonText}</button>
			<button onClick={this.buttonClicked} value="Return">Return</button>
			</div>
		);
	}

}