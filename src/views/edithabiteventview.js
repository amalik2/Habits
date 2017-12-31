import EventView from '../views/eventview';

import Location from '../models/location';

/**
 * Allows the user to edit a habit event's details
 */
export default class EditEventView extends EventView {

/**
	 * Create a new EventView object
	 * @param props - Contains:
	 * @param {String} habitTitle - the title of the habit this event is a part of
	 * @param {Date} startDate - the date the habit was meant to start on
	 * @param {void} onReturn - callback function for when the view is exited
	 * @param {HabitEvent!} event - the habit event that is being edited
	 */
	constructor(props){
		super(props);
		
		this.state.event = props.event;
		
		this.state.commentInput = this.state.event.getComment();
		this.state.dateInput = formatDate(this.state.event.getDate());
		this.state.locationInputLat = this.state.event.getLocation().getLatitude();
		this.state.locationInputLong = this.state.event.getLocation().getLongitude();
	}
	
	/**
	 * Handle the user clicking the confirm button
	 * @param event - the event triggered by the button click
	 */
	onConfirmClicked(event){
		
		let date = new Date(this.state.dateInput);
		
		if (this.validateDates(date)){
			let location = new Location(this.state.locationInputLat, this.state.locationInputLong);
			// TODO: if location is invalid, set location = null;
			
			// update the old event's details
			this.state.event.setComment(this.state.commentInput);
			this.state.event.setPhoto(this.state.photoInput);
			this.state.event.setDate(date);
			this.state.event.setLocation(location);
			
			this.state.onReturn(this.state.event);
		}
		
	}
	
	/**
	 * @return {String} the text to display on the confirm button
	 */
	getConfirmButtonText(){
		return "Edit";
	}
	
}