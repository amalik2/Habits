import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {isAlphanumeric} from './utilities/stringutilities';
import {getQueryable} from './utilities/queryutilities';

import HomePage from './views/home';

import User from './models/user';

/**
 * Main application view, allowing the user to sign in to the system
 */
class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			// {User} logged in user
			loggedIn: null,
			// {String} the current entry in the name input field
			name: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.signOut = this.signOut.bind(this);
		
		getQueryable();
	}
	
	/**
	 * Handles the user selecting the sign in button
	 * @param event - the button click event that led to this being called
	 */
	handleSubmit(event){
		
		if (this.state.name.length === 0){
			alert("Empty name");
			return;
		}
		
		if (!isAlphanumeric(this.state.name)){
			alert("Invalid name selected. Names must be alphanumeric.");
			return;
		}
		
		this.setState({
			loggedIn: new User(this.state.name)
		});
	}
	
	/**
	 * Handles the user changing the name input field text
	 * @param event - the input change event that triggered this function call
	 */
	nameChange(event){
		this.setState({
			name: event.target.value
		});
	}
	
	/**
	 * Signs the user out of the system
	 */
	signOut(){
		this.setState({
			loggedIn: null
		});
	}
	
	/**
	 * @return the header that will be displayed across all pages in the application
	 */
	getHeader(){
		return (
			<header className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h1 className="App-title">Habit Tracker</h1>
			</header>
		);
	}
	
	render() {
		if (this.state.loggedIn != null){
		  return (
				<div align='center'>
					{this.getHeader()}
					<HomePage user={this.state.loggedIn} signOut={this.signOut} />
				</div>
			);
		} else {
		  return (
			  <div className="App">
				{this.getHeader()}
				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="text" name="Username" value={this.state.name} onChange={this.nameChange}/>
					</label>
					<input type="submit" value="Sign In" />
				</form>
			  </div>
			);
		}
	}
}

export default App;
