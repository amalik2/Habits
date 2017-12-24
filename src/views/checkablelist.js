import React, { Component } from 'react';

/**
 * Keeps track of a list of unique string items to display as a checkable list
 */
export default class CheckableList extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: props.items,
			checked: props.checked,
			onClicked: props.onClick
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.isChecked = this.isChecked.bind(this);
	}
	
	handleChange(event){
		this.state.onClicked(event.target.value);
	}
	
	/**
	* @return whether the specified item is checked or not
	*/
	isChecked(item){
		for (var i = 0; i < this.state.items.length; ++i){
			if (this.state.items[i] === item){
				break;
			}
		}
		return this.state.checked[i];
	}
	
	render(){
	
		return (
			<form>
				{
					this.state.items.map((item) => (
						<div>
							<label>
								<input type="checkbox" refs="complete" onChange={this.handleChange}
									value={item} checked={this.isChecked(item)} />
									{item}
							</label>
							<br />
						</div>
					))
				}
			</form>
		);
	}
	
}