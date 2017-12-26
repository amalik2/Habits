import React from 'react';
import HomePage from '../views/home';
import renderer from 'react-test-renderer';

import { shallow, mount } from 'enzyme';

/**
 * UI tests for the home page of the application
 */

test("Test menu navigation", () => {
	const component = mount(
		<HomePage user="TestUser" signOut={null} />,
	);
	
	// side bar buttons
	const buttons = component.find("Sidebar").find("button");
	const length = buttons.length - 1;		// purposely ignore the last button (sign out, it is checked in mainpage-tests.js)
	for (let i = 0; i < length; ++i){
		buttons.at(i).simulate('click');
	}
	
});