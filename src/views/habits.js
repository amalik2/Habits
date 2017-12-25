import React, { Component } from 'react';

import '../models/user';
import '../models/habit';
import './habits.css';

import {formatDate} from '../utilities/dateutilities';
import {isAlphanumeric} from '../utilities/stringutilities';

import User from '../models/user';
import HabitView from './habitview';

/**
 * Displays information about all of the habits the user has created, and allows them to create
 * new ones
 */
export default class HabitsPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			user: props.user,
			editHabit: null,
			createHabit: false
		};
		
		this.editHabit = this.editHabit.bind(this);
		this.onReturn = this.onReturn.bind(this);
		this.createHabitClicked = this.createHabitClicked.bind(this);
		this.isValidTitle = this.isValidTitle.bind(this);
	}
	
	isValidTitle(title){
		if (!isAlphanumeric(title)){
			return false;
		}
		
		for (let habit of this.state.user.getHabits()){
			if (habit.getTitle() === title)
				return false;
		}
		
		return true;
	}
	
	createHabitClicked(event){
		this.setState({
			createHabit: true
		});
	}
	
	editHabit(event){
		this.setState({
			editHabit: this.state.user.getHabitByTitle(event.target.value)
		});
	}
	
	/**
	 * Handle the return result from viewing a habit
	 * @param habit the habit that was being viewed (null if no changes were made)
	 */
	onReturn(habit){
		if (habit != null){
			if (this.state.editHabit == null){
				this.state.user.addHabit(habit);
			}
		}
		this.setState({
			editHabit: null,
			createHabit: false
		});
	}
	
	render(){
		
		if (this.state.editHabit != null || this.state.createHabit){
			return <HabitView habit={this.state.editHabit} onReturn={this.onReturn} validateTitle={this.isValidTitle} />;
		}
		
		return (
			<div>
				<button onClick={this.createHabitClicked}>Create Habit</button>
				<table align='center' className='habitsTable'>
					<tr>
						<th>Title</th>
						<th>Times Completed</th>
						<th>Last Completion</th>
						<th>Start Date</th>
						<th></th>
					</tr>
					
					{
						this.state.user.getHabits().map((habit) => (
							<tr>
								<td>{habit.getTitle()}</td>
								<td>{habit.getTimesCompleted()}</td>
								<td>{habit.getLastCompletionString()}</td>
								<td>{formatDate(habit.getStartDate())}</td>
								<td>
									<button onClick={this.editHabit} value={habit.getTitle()}>Edit</button>
								</td>
							</tr>
						))
					}
					
				</table>
			</div>
		);
	
	}

}