import React from 'react';
import HomePage from '../views/home';
import renderer from 'react-test-renderer';

import Habit from '../models/habit';

import { shallow, mount } from 'enzyme';

/**
 * UI tests for the home page of the application
 */

 test("Test complete habit", () => {
	const component = mount(
		<HomePage user="TestUser" signOut={null} />,
	);
	
	var signedInUser = component.state().user;
	signedInUser.addHabit(new Habit("HabitAppears", "None", new Date(), [0, 1, 2, 3, 4, 5, 6]));
	signedInUser.addHabit(new Habit("HabitAppears2", "None", new Date(), [0, 1, 2, 3, 4, 5, 6]));
	signedInUser.addHabit(new Habit("HabitAppears3", "None", new Date(), [0, 1, 2, 3, 4, 5, 6]));
	
	// TODO: make this update
	component.instance().forceUpdate();
	component.update();
	
	// event view shouldn't be displayed at the start
	expect(component.find('EventView').length).toBe(0);
	
	const tasks = component.find('TodaysTasks');
	const todaysHabitsInputs = tasks.find('CheckableList').find('input');
	// verify all of the habits meant to be done today are shown
	//expect(todaysHabitsInputs.length).toBe(component.state().user.getTodaysTasks().length);
	
	let habit = signedInUser.getHabits()[1];
	
	// HabitAppears2 is being tested
	const checkbox = todaysHabitsInputs.at(1);
	expect(checkbox.props().checked).toBe(false);	// make sure it is not checked, as it has not been completed today
	checkbox.simulate('change');	// click the checkbox
	expect(component.state().completingHabit).toBe(habit.getTitle());
	
	const eventView = component.find('EventView');
	const dateInput = eventView.find('input').at(1);
	const eventButtons = eventView.find('button');
	const confirmButton = eventButtons.at(0);
	const cancelButton = eventButtons.at(1);
	
	// return without creation
	cancelButton.simulate('click');
	expect(habit.getEvents().length == 0);
	expect(checkbox.props().checked).toBe(false);
	expect(component.state().completingHabit).toBe("");
	checkbox.simulate('change');
	expect(component.state().completingHabit).toBe(habit.getTitle());
	
	// incomplete information: missing valid date
	dateInput.simulate('change', {target: {value: "abc"}});
	// TODO: fix this not working
	expect(dateInput.props().value).toBe("abc");
	confirmButton.simulate('click');
	expect(habit.getEvents().length == 0);
	expect(component.state().completingHabit).toBe(habit.getTitle());
	dateInput.simulate('change', {target: {value: "Dec 21 XYZ"}});
	expect(dateInput.props().value).toBe("Dec 21 XYZ");
	
	confirmButton.simulate('click');
	expect(component.state().completingHabit).toBe(habit.getTitle());
	expect(habit.getEvents().length == 0);
	// don't allow an event to be made on a date before the habit was supposed to start
	dateInput.simulate('change', {target: {value: "Dec 21 2012"}});
	confirmButton.simulate('click');
	expect(habit.getEvents().length == 0);
	expect(component.state().completingHabit).toBe(habit.getTitle());
	
	// TODO: complete successfully on a different date
	expect(checkbox.props().checked).toBe(false);
	expect(component.state().completingHabit).toBe("");
	
	// complete successfully on same date
	confirmButton.simulate('click');
	expect(habit.getEvents().length == 1);
	expect(checkbox.props().checked).toBe(true);
	expect(component.state().completingHabit).toBe("");
	checkbox.simulate('change');
	// prevent another event from being made today
	expect(checkbox.props().checked).toBe(true);
	expect(component.state().completingHabit).toBe("");
	
	// make sure the other checkboxes are still clickable
	const otherCheckbox = todaysHabitsInputs.at(0);
	expect(otherCheckbox.props().checked).toBe(false);
	otherCheckbox.simulate('change');
	expect(component.state().completingHabit).toBe(signedInUser.getHabits()[0].getTitle());
	
});
 
test("Test menu navigation", () => {
	const component = mount(
		<HomePage user="TestUser" signOut={null} />,
	);
	
	expect(component.find('p').text()).toBe("Welcome, TestUser!");	// display user's name
	
	// side bar buttons
	const buttons = component.find("Sidebar").find("button");
	const length = buttons.length - 1;		// purposely ignore the last button (sign out, it is checked in mainpage-tests.js)
	for (let i = 0; i < length; ++i){
		buttons.at(i).simulate('click');
	}
	
});