import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

import { mount } from 'enzyme';

/**
 * UI tests for the main page of the application
 */

test("Can't sign in with an invalid name", () => {
	const component = mount(
		<App />,
	);
  
	expect(component.state().loggedIn).toBe(null);
	expect(component.state().name).toBe("");
  
	const usernameForm = component.find('input');
	const usernameInput = usernameForm.first();
	const submit = usernameForm.at(1);
	
	const INVALID_SYMBOLS = "'.\"[]/?=-_+\|}{}`\\ ";
	
	// prevent logging in with an empty name
	submit.simulate('submit');
	expect(component.state().loggedIn).toBe(null);
	
	// make sure all invalid symbols are rejected
	for (let i = 0; i < INVALID_SYMBOLS.length; ++i){
		usernameInput.simulate('change', {target: {value: INVALID_SYMBOLS[i]}});
		expect(component.state().name).toBe(INVALID_SYMBOLS[i]);
		submit.simulate('submit');
		expect(component.state().loggedIn).toBe(null);
	}
	
	// make sure all of the following names work
	const VALID_NAMES = ["abc", "123", "abc123", " ab", " ab c ", "xyz 12345678910111213", "abcdefghijklmnopqrstuvwxyz1234567890"];
	const length = VALID_NAMES.length;
	for (let i = 0; i < length; ++i){
		usernameInput.simulate('change', {target: {value: VALID_NAMES[i]}});
		expect(component.state().name).toBe(VALID_NAMES[i]);
		submit.simulate('submit');
		expect(component.state().loggedIn).toBe(VALID_NAMES[i]);
	}
	
	
});

test("Error signing in or out of the application", () => {
	const component = mount(
		<App />,
	);
	
	expect(component.find('HomePage').length).toBe(0);
	
	const usernameForm = component.find('input');
	const usernameInput = usernameForm.first();
	const submit = usernameForm.at(1);
	
	usernameInput.simulate('change', {target: {value: "signintest"}});
	expect(component.state().name).toBe("signintest");
	submit.simulate('submit');
	expect(component.state().loggedIn).toBe("signintest");
	
	// make sure sign in takes user to the home page
	const home = component.find('HomePage').first();
	expect(home).not.toBe(null);
	
	// test to make sure the logout button works
	const buttons = home.find("Sidebar").find("button");
	// positon of logout is the last one in the list
	buttons.at(buttons.length - 1).simulate('click');
	
});
