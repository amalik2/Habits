import React, { Component } from 'react';

import Habit from '../models/habit';

import EditEventView from '../views/edithabiteventview';

import {formatDate} from '../utilities/dateutilities';

import './habits.css';

const NO_EVENT_EDITED = -1;

/**
 * Displays a list of habit events the user has completed
 */
 // TODO: display image
export default class HabitHistory extends Component {

	constructor(props){
		super(props);
		this.state = {
			user: props.user,
			
			// index of the event being edited inside this.history (-1 if there is none being edited)
			editingEventIndex: NO_EVENT_EDITED
		};
		
		this.removeEvent = this.removeEvent.bind(this);
		this.editEvent = this.editEvent.bind(this);
		this.onEventReturn = this.onEventReturn.bind(this);
		
		// TODO: should this be recalculated when events are removed?
		this.history = this.state.user.getHabitHistory();
	}
	
	/**
	 * Handle the user clicking a delete event button
	 * @param event the button click event that triggered this call
	 */
	removeEvent(event){
		const habitId = this.history[event.target.value].getHabitId();
		this.state.user.removeHabitById(habitId);
		// refresh the view
		this.setState({
			user: this.state.user
		});
	}
	
	/**
	 * Return from viewing a habit event
	 */
	onEventReturn(event){
		this.setState({
			editingEventIndex: NO_EVENT_EDITED
		});
	}
	
	/**
	 * Handle the user clicking an edit event button
	 * @param event the button click event that triggered this call
	 */
	editEvent(event){
		this.setState({
			editingEventIndex: event.target.value
		});
	}
	
	render(){
		
		if (this.state.editingEventIndex !== NO_EVENT_EDITED){
			let event = this.history[this.state.editingEventIndex];
			return <EditEventView event={event} habitTitle={this.state.user.getHabitById(event.getHabitId()).getTitle()} onReturn={this.onEventReturn} />;
		}
		
		var buttonText = (this.state.habit == null) ? "Create" : "Edit";
		var displayList = [];
		
		var index = this.history.length;
		
		return (
			<div>
				<table align='center' className='habitsTable'>
					<tr>
						<th>Habit</th>
						<th>Comment</th>
						<th>Date</th>
						<th>Image</th>
						<th></th>
						<th></th>
					</tr>
					
					{
						this.history.map((event) => {--index; return (<tr>
								<td>{this.state.user.getHabitById(event.getHabitId()).getTitle()}</td>
								<td>{event.getComment()}</td>
								<td>{formatDate(event.getDate())}</td>
								<td>{}</td>
								<td>
									<button onClick={this.editEvent} value={index}>Edit</button>
								</td>
								<td>
									<button onClick={this.removeEvent} value={index}>Delete</button>
								</td>
							</tr>
						)}
						)
					}
					
				</table>
			</div>
		);
	}

}