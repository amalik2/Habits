import HabitView from '../views/habitview';

import {formatDate, isValid} from '../utilities/dateutilities';

/**
 * View that allows the user to edit an existing habit's details
 */
export default class EditHabitView extends HabitView {

	constructor(props){
		super(props);		
		this.state.dateInputText = formatDate(this.state.habit.getStartDate());
		this.state.titleInputText = this.state.habit.getTitle();
		this.state.reasonInputText = this.state.habit.getReason();
		
		for (let i of this.state.habit.getDaysOfWeek())
			this.state.daysOfWeekChecked[i] = true;
	}
	
	/**
	 * Handle the user clicking the cancel or confirm button
	 * @param event - the event triggered by the button click
	 * @return {Habit} habit if confirm was clicked, or null otherwise
	 * @return {null} if confirm was clicked but the habit information was invalid
	 */
	buttonClicked(event){
		
		const cancel = event.target.value === "Return";
		
		// the habit that will be returned if cancel is false
		let newHabit = null;
		
		// if the title is invalid, or a duplicate, prevent it from being used
		if (!cancel){
			if ((!this.state.validateTitle(this.state.titleInputText) && this.state.habit.getTitle() !== this.state.titleInputText)){
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
				
				// update the old habit's details
				this.state.habit.setTitle(this.state.titleInputText);
				this.state.habit.setReason(this.state.reasonInputText);
				this.state.habit.setStartDate(date);
				this.state.habit.setDaysOfWeek(days);
				newHabit = this.state.habit;
				
			}
		}
		
		this.state.onReturn(cancel ? null : newHabit);
	}
	
	getConfirmButtonText(){
		return "Edit";
	}
}