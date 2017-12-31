import React from 'react';
import EventView from '../views/eventview';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import {formatDate} from '../utilities/dateutilities';

test("Cancel button", () => {
	
	const spy = jest.spyOn(EventView.prototype, 'onCancelClicked');
	
	const component = shallow(
		<EventView habitTitle="Habit Title" startDate={new Date()} onReturn={() => {}} />,
	);
	
	const inputs = component.find('button');
	inputs.at(0).simulate('click');
	expect(spy).toHaveBeenCalledTimes(0);
	inputs.at(1).simulate('click');
	expect(spy).toHaveBeenCalledTimes(1);
	
	spy.mockClear();
});

test("Confirm button", () => {
	
	const spy = jest.spyOn(EventView.prototype, 'onConfirmClicked');
	const mockReturn = jest.fn();
	
	const component = shallow(
		<EventView habitTitle="Habit Title" startDate={new Date()} onReturn={mockReturn} />,
	);
	
	const inputs = component.find('button');
	inputs.at(1).simulate('click');			// cancel button
	expect(spy).toHaveBeenCalledTimes(0);
	inputs.at(0).simulate('click');			// confirm button
	expect(spy).toHaveBeenCalledTimes(1);
	expect(mockReturn).toHaveBeenCalledTimes(2);	// callback function should be called both times
	
	spy.mockClear();
	mockReturn.mockClear();
});

test("Event information input fields", () => {
	
	const mockReturn = jest.fn();
	
	const component = shallow(
		<EventView habitTitle="Habit Title" startDate={new Date()} onReturn={mockReturn} />,
	);
	
	const inputs = component.find('input');
	
	let commentInput = inputs.at(0);
	let dateInput = inputs.at(1);
	let latitudeInput = inputs.at(2);
	let longitudeInput = inputs.at(3);
	
	const COMMENTS = ["", " ", "-A", "COMMENT", "test", "abcdefghijklmnopqrstuvwxyz1234567890.,-a]we[]'asd"];
	for (let i = 0; i < COMMENTS.length; ++i){
		commentInput.simulate("change", {target: {value: COMMENTS[i]}});
		expect(component.state().commentInput).toBe(COMMENTS[i]);
	}
	
	let DATE_TEXT = "December 1, 2012";
	dateInput.simulate("change", {target: {value: DATE_TEXT}});
	expect(component.state().dateInput).toBe(DATE_TEXT);
	
	const confirmButton = component.find('button').first();
	confirmButton.simulate('click');
	expect(mockReturn).toHaveBeenCalledTimes(0);	// date was before the habit start date, so should not be called
	
	DATE_TEXT = formatDate(new Date());
	dateInput.simulate("change", {target: {value: DATE_TEXT}});
	expect(component.state().dateInput).toBe(DATE_TEXT);
	confirmButton.simulate('click');
	expect(mockReturn).toHaveBeenCalledTimes(1);	// date is valid, so should be called
	
	DATE_TEXT = "XYZ 20, 2012";
	dateInput.simulate("change", {target: {value: DATE_TEXT}});
	expect(component.state().dateInput).toBe(DATE_TEXT);
	confirmButton.simulate('click');
	expect(mockReturn).toHaveBeenCalledTimes(1);	// date is invalid, so don't call it again
	
	DATE_TEXT = "December 21, 2117";
	dateInput.simulate("change", {target: {value: DATE_TEXT}});
	expect(component.state().dateInput).toBe(DATE_TEXT);
	confirmButton.simulate('click');
	expect(mockReturn).toHaveBeenCalledTimes(1);	// date is in the future, so don't call it again
	
	const LATITUDE = 25.0;
	latitudeInput.simulate("change", {target: {value: LATITUDE}});
	expect(component.state().locationInputLat).toBe(LATITUDE);
	
	const LONGITUDE = 25.0;
	longitudeInput.simulate("change", {target: {value: LONGITUDE}});
	expect(component.state().locationInputLong).toBe(LATITUDE);
	
	mockReturn.mockClear();
});


