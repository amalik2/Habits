import React, { Component } from 'react';

export default class Sidebar extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: props.items
		};
		
		this.buttonClicked = this.buttonClicked.bind(this);
	}
	
	buttonClicked(event){
		alert(event.target.value);
	}
	
	render(){
		
		// from: https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_over
		return (
			<div className="w3-sidebar w3-bar-block w3-border-right" id="mySidebar">
				{
					this.state.items.map((item) => (
						<button onClick={this.buttonClicked} className="w3-bar-item w3-button" value={item}>{item}</button>
					))
				}
			</div>
		);
	}

}