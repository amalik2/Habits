import EventView from '../views/eventview';

import Location from '../models/location';

import {formatDate, isValid, isBefore, isSameDate} from '../utilities/dateutilities';

/**
 * Allows the user to edit a habit event's details
 */
export default class EditEventView extends EventView {

	constructor(props){
		super(props);
		
		this.state.commentInput = this.state.event.getComment();
		this.state.dateInput = formatDate(this.state.event.getDate());
		this.state.locationInputLat = this.state.event.getLocation().getLatitude();
		this.state.locationInputLong = this.state.event.getLocation().getLongitude();
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
			
			// update the old habit's details
			this.state.event.setComment(this.state.commentInput);
			this.state.event.setPhoto(this.state.photoInput);
			this.state.event.setDate(date);
			this.state.event.setLocation(location);
			newEvent = this.state.event;
		}
		
		this.state.onReturn(cancel ? null : newEvent);
	}
	
	getConfirmButtonText(){
		return "Edit";
	}
	
}