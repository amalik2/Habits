import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {isAlphanumeric} from './utilities/stringutilities';
import {getQueryable} from './utilities/queryutilities';

import HomePage from './views/home';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			// logged in user
			loggedIn: null,
			// the current entry in the name input field
			name: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.signOut = this.signOut.bind(this);
		
		getQueryable();
	}
	
	handleSubmit(event){
		
		if (this.state.name.length === 0){
			alert("Empty name");
			return;
		}
		
		if (!isAlphanumeric(this.state.name)){
			alert("Invalid name selected. Names must be alphanumeric.");
			return;
		}
		
		this.setState({loggedIn: this.state.name});
	}
	
	nameChange(event){
		this.setState({name: event.target.value});
	}
	
	signOut(){
		this.setState({loggedIn: null});
	}
	
	getHeader(){
		return (
			<header className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h1 className="App-title">Habit Tracker</h1>
			</header>
		);
	}
	
  render() {
	  //<button onClick={this.signOut}>Sign Out</button>
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
