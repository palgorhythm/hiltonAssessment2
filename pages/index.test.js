import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App debug />);
  });

  it('should render correctly in "debug" mode', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have "Adults" and "Children" drop-down fields for rooms 2,3, and 4 disabled by default', () => {
    expect(setState).toHaveBeenCalledWith(initialState);
  });

  it('should enable the drop-down fields associated with a room when the checkbox is set to active', () => {});

  it('should auto-check all rooms with a lower number', () => {});

  it('a checked room card should have the active class added', () => {});
  it('a room that is unchecked returns to the unselected state, and its drop-downs should become disabled and return to default values', () => {});

  it('all rooms that have a higher number than an unchecked room should also be unchecked', () => {});
});
