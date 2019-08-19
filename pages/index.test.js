import App from './index';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

let debug, getByTestId, getAllByTestId, getByText;
let wrapper;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  wrapper = render(<App />);
  debug = wrapper.debug;
  getByTestId = wrapper.getByTestId;
  getAllByTestId = wrapper.getAllByTestId;
  getByText = wrapper.getByText;
});

test('should render 4 RoomConfig components as children', () => {
  const roomConfigs = getAllByTestId('room-config');
  expect(roomConfigs.length).toBe(4);
});

test('should have "Adults" and "Children" drop-down fields for rooms 2,3, and 4 disabled by default', () => {
  for (let i = 0; i < 4; i++) {
    const dropdown = getByTestId(`dropdown-${i}`);
    if (i > 0) {
      expect(dropdown.getAttribute('disabled')).toBe('');
    } else if (i === 0) {
      expect(dropdown.getAttribute('disabled')).toBe(null);
    }
  }
});

test('should enable the drop-down fields associated with a room when the checkbox is set to active', () => {
  const checkbox1 = getByTestId('checkbox-1');
  const dropdown1 = getByTestId('dropdown-1');
  console.log(checkbox1);
  expect(checkbox1.checked).toBe(false);
  expect(dropdown1.getAttribute('disabled')).toBe('');
  fireEvent.click(checkbox1);
  expect(checkbox1.checked).toBe(true);
  // expect(dropdown1.getAttribute('disabled')).toBe(null);
});

test('should auto-check all rooms with a lower number', () => {});

test('a checked room card should have the active class added', () => {});
test('a room that is unchecked returns to the unselected state, and its drop-downs should become disabled and return to default values', () => {});

test('all rooms that have a higher number than an unchecked room should also be unchecked', () => {});
