import HabitView from '../views/habitview';

import {formatDate, isValid} from '../utilities/dateutilities';

/**
 * View that allows the user to edit an existing habit's details
 */
export default class EditHabitView extends HabitView {

/**
	 * Create a new HabitView object
	 * @param props - Contains:
	 * @param {void} onReturn - callback function when this view is exited
	 * @param {boolean(String)} validateTitle - callback function for validating whether a habit title is valid or not
	 * @param {Habit!} habit - the habit being edited
	 */
	constructor(props){
		super(props);
		// the habit being edited
		this.state.habit = props.habit;
		this.state.dateInputText = formatDate(this.state.habit.getStartDate());
		this.state.titleInputText = this.state.habit.getTitle();
		this.state.reasonInputText = this.state.habit.getReason();
		
		for (let i of this.state.habit.getDaysOfWeek())
			this.state.daysOfWeekChecked[i] = true;
	}
	
	/**
	 * @return {Boolean} whether the selected habit title is valid and can be used to update the habit's details
	 */
	validateHabitTitle(){
		return this.state.validateTitle(this.state.titleInputText) || this.state.habit.getTitle() === this.state.titleInputText;
	}
	
	 /**
	 * Handle the user clicking the confirm button
	 * @param event - the event triggered by the button click
	 * @return {Habit} the altered habit if confirm was clicked and the habit information was valid, undefined otherwise
	 */
	onConfirmClicked(event){
		if (this.validateHabitDetails()){
			this.state.habit.setTitle(this.state.titleInputText);
			this.state.habit.setReason(this.state.reasonInputText);
			this.state.habit.setStartDate(new Date(this.state.dateInputText));
			this.state.habit.setDaysOfWeek(this.getSelectedDays());
			this.state.onReturn(this.state.habit);
		}
	}
	
	/**
	 * @return {String} the text to display on the confirm button
	 */
	getConfirmButtonText(){
		return "Edit";
	}
}