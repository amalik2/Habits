import React, { Component } from 'react';

import '../models/user';
import '../models/habit';
import './habits.css';

import {formatDate} from '../utilities/dateutilities';

import User from '../models/user';
import HabitView from './habitview';

export default class HabitsPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			user: props.user,
			editHabit: null
		};
		
		this.editHabit = this.editHabit.bind(this);
	}
	
	editHabit(event){
		this.setState({
			editHabit: this.state.user.getHabitByTitle(event.target.value)
		});
	}
	
	render(){
		
		if (this.state.editHabit != null){
			return <HabitView habit={this.state.editHabit} />;
		}
		
		return (
		
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
		);
	
	}

}