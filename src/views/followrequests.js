import React, { Component } from 'react';

import User from '../models/user';

import {formatDate} from '../utilities/dateutilities';

import './habits.css';

/**
 * Displays a list of users that sent this user a follow request
 */
export default class FollowRequests extends Component {

	constructor(props){
		super(props);
		this.state = {
			user: props.user,
			
			// id of the profile being viewed (null if none is being viewed)
			viewedProfileId: null
		};
		
		this.removeRequest = this.removeRequest.bind(this);
		this.acceptRequest = this.acceptRequest.bind(this);
		this.viewProfile = this.viewProfile.bind(this);
		
		this.requests = this.state.user.getFollowRequests();
	}
	
	/**
	 * Handle the user clicking a view profile button
	 * @param event the button click event that triggered this call
	 */
	viewProfile(event){
		// TODO
	}
	
	/**
	 * Handle the user clicking a reject request button
	 * @param event the button click event that triggered this call
	 */
	removeRequest(event){
		this.state.user.removeFollowRequestById(event.target.value);
		// refresh the view
		this.setState({
			user: this.state.user
		});
	}
	
	/**
	 * Handle the user clicking an accept request button
	 * @param event the button click event that triggered this call
	 */
	acceptRequest(event){
		this.state.user.acceptFollowRequest(event.target.value);
		// refresh the view
		this.setState({
			user: this.state.user
		});
	}
	
	render(){
		
		/*if (this.state.editingEventIndex !== NO_EVENT_EDITED){
			let event = this.history[this.state.editingEventIndex];
			return <EventView event={event} habitTitle={this.state.user.getHabitById(event.getHabitId()).getTitle()} onReturn={this.onEventReturn} />;
		}*/
		
		return (
			<div>
				<table align='center' className='habitsTable'>
					<tr>
						<th>Name</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					
					{
						this.requests.map((user) => (<tr>
								<td>{user.getName()}</td>
								<td>
									<button onClick={this.acceptRequest} value={user.getId()}>Edit</button>
								</td>
								<td>
									<button onClick={this.removeRequest} value={user.getId()}>Delete</button>
								</td>
								<td>
									<button onClick={this.viewProfile} value={user.getId()}>View</button>
								</td>
							</tr>
						))
					}
					
				</table>
			</div>
		);
	}

}