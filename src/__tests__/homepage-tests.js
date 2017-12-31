import React from 'react';
import HomePage from '../views/home';
import renderer from 'react-test-renderer';

import Habit from '../models/habit';
import HabitEvent from '../models/habitevent';
import Location from '../models/location';

import { shallow, mount } from 'enzyme';

/**
 * UI tests for the home page of the application
 */
 
 test("Test complete habit", () => {
	const component = mount(
		<HomePage user="TestUser" signOut={null} />,
	);
	
	var signedInUser = component.state().user;
	signedInUser.addHabit(new Habit("HabitAppears", "None", new Date("December 5, 2017"), [0, 1, 2, 3, 4, 5, 6]));
	signedInUser.addHabit(new Habit("HabitAppears2", "None", new Date("December 5, 2017"), [0, 1, 2, 3, 4, 5, 6]));
	signedInUser.addHabit(new Habit("HabitAppears3", "None", new Date("December 5, 2017"), [0, 1, 2, 3, 4, 5, 6]));
	
	// TODO: make this update
	component.instance().forceUpdate();
	component.update();
	
	// event view shouldn't be displayed at the start
	expect(component.find('EventView').length).toBe(0);
	
	const tasks = component.find('TodaysTasks');
	const todaysHabitsInputs = tasks.find('CheckableList').find('input');
	// verify all of the habits meant to be done today are shown
	// TODO: uncomment when component updates
	//expect(todaysHabitsInputs.length).toBe(component.state().user.getTodaysTasks().length);
	
	let habit = signedInUser.getHabits()[1];
	let habit2 = signedInUser.getHabits()[2];
	
	// HabitAppears2 is being tested
	const checkbox = todaysHabitsInputs.at(1);
	expect(checkbox.props().checked).toBe(false);	// make sure it is not checked, as it has not been completed today
	checkbox.simulate('change');	// click the checkbox
	expect(component.state().completingHabit).toBe(habit.getTitle());
	
	component.instance().onEventReturn(null);
	expect(habit.getEvents().length == 0);
	expect(component.state().completingHabit).toBe("");
	
	checkbox.simulate('change');	// click the checkbox
	expect(component.state().completingHabit).toBe(habit.getTitle());
	
	component.instance().onEventReturn(new HabitEvent("", new Date(), "", new Location(0.0, 0.0)));
	expect(habit.getEvents().length == 1);
	//expect(checkbox.props().checked).toBe(true);
	expect(component.state().completingHabit).toBe("");
	checkbox.simulate('change');
	// prevent another event from being made today
	//expect(checkbox.props().checked).toBe(true);
	expect(component.state().completingHabit).toBe("");
	
	// make sure all of the other checkboxes are still clickable
	for (let i = 0; i < todaysHabitsInputs.length; ++i){
		if (i != 1){
			const otherCheckbox = todaysHabitsInputs.at(i);
			expect(otherCheckbox.props().checked).toBe(false);
			otherCheckbox.simulate('change');
			expect(component.state().completingHabit).toBe(signedInUser.getHabits()[i].getTitle());
		}
	}
	
	// test creating an event on a different date
	let lastHabit = signedInUser.getHabits()[todaysHabitsInputs.length - 1];
	component.instance().onEventReturn(new HabitEvent("", new Date("December 10, 2017"), "", new Location(0.0, 0.0)));
	expect(lastHabit.getEvents().length).toBe(1);
	expect(component.state().completingHabit).toBe("");
	
	// after creation, since the event was not made today, make sure another event can still be created today
	const lastCheckbox = todaysHabitsInputs.at(todaysHabitsInputs.length - 1);
	expect(lastCheckbox.props().checked).toBe(false);
	lastCheckbox.simulate('change');
	expect(component.state().completingHabit).toBe(lastHabit.getTitle());
	component.instance().onEventReturn(new HabitEvent("", new Date("December 30, 2017"), "", new Location(0.0, 0.0)));
	expect(lastHabit.getEvents().length).toBe(2);
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