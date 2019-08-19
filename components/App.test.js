import App from './App';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { LocalStorageMock } from '@react-mock/localstorage';

let debug, getByTestId, getAllByTestId, getByText;
let wrapper;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  wrapper = render(
    <LocalStorageMock>
      <App />
    </LocalStorageMock>
  );
  debug = wrapper.debug;
  getByTestId = wrapper.getByTestId;
  getAllByTestId = wrapper.getAllByTestId;
  getByText = wrapper.getByText;
});

test('should render 4 RoomConfig components as children', () => {
  for (let i = 0; i < 4; i++) {
    const roomConfig = getByTestId(`room-config-${i}`);
    expect(roomConfig).toBeTruthy();
  }
});

test('should have "Adults" and "Children" drop-down fields for rooms 2, 3, and 4 disabled by default', () => {
  for (let i = 0; i < 4; i++) {
    const dropdown = getByTestId(`adults-dropdown-${i}`);
    if (i > 0) {
      expect(dropdown.disabled).toBe(true);
    } else if (i === 0) {
      expect(dropdown.disabled).toBe(false);
    }
  }
});

test('should enable the drop-down fields associated with a room when the checkbox is set to active', () => {
  expect(getByTestId('checkbox-1').checked).toBe(false);
  expect(getByTestId('adults-dropdown-1').disabled).toBe(true);
  fireEvent.click(getByTestId('checkbox-1'));
  expect(getByTestId('checkbox-1').checked).toBe(true);
  expect(getByTestId('adults-dropdown-1').disabled).toBe(false);
});

for (let i = 1; i < 4; i++) {
  test(`should auto-check all rooms with a lower number than room ${i +
    1}`, () => {
    const checkbox = getByTestId(`checkbox-${i}`);
    for (let j = 0; j < i; j++) {
      if (i === 0) {
        expect(getByTestId(`checkbox-${i}`).checked).toBe(true);
      } else {
        expect(getByTestId(`checkbox-${i}`).checked).toBe(false);
      }
    }
    fireEvent.click(checkbox);
    for (let j = 0; j < i; j++) {
      expect(getByTestId(`checkbox-${i}`).checked).toBe(true);
    }
  });
}

test('a checked room card should have the active class added', () => {
  expect(getByTestId('room-config-1').classList.contains('active')).toBe(false);
  expect(getByTestId('room-config-1').classList.contains('inactive')).toBe(
    true
  );
  fireEvent.click(getByTestId('checkbox-1'));
  expect(getByTestId('room-config-1').classList.contains('active')).toBe(true);
  expect(getByTestId('room-config-1').classList.contains('inactive')).toBe(
    false
  );
});

test('a room that is unchecked returns to the unselected state, and its drop-down should become disabled and return to default values', () => {
  fireEvent.click(getByTestId('checkbox-1'));
  expect(getByTestId('adults-dropdown-1').disabled).toBe(false);
  expect(getByTestId('adults-dropdown-1').value).toBe('1');
  fireEvent.change(getByTestId('adults-dropdown-1'), {
    target: { value: '2' }
  });
  expect(getByTestId('adults-dropdown-1').value).toBe('2');
  fireEvent.click(getByTestId('checkbox-1'));
  expect(getByTestId('adults-dropdown-1').value).toBe('1');
});

for (let i = 1; i < 4; i++) {
  test(`all rooms that have a higher number than unchecked room ${i +
    1} should also be unchecked`, () => {
    for (let j = 1; j < 4; j++) {
      // check all rooms.
      fireEvent.click(getByTestId(`checkbox-${j}`));
      expect(getByTestId(`checkbox-${j}`).checked).toBe(true);
    }
    fireEvent.click(getByTestId(`checkbox-${i}`)); // uncheck the current checkbox for the test

    for (let j = 0; j > i && j < 4; j++) {
      // look at all checkboxes above the current, and make sure they're also unchecked
      expect(getByTestId(`checkbox-${i}`).checked).toBe(false);
    }
  });
}

test('when the user clicks submit, state should be saved to localStorage', () => {
  //change numAdults to 2 for Room 1's dropdown
  fireEvent.change(getByTestId('adults-dropdown-0'), {
    target: { value: '2' }
  });
  //activate the Room 2 checkbox
  fireEvent.click(getByTestId('checkbox-1'));
  //submit state to have it saved to localStorage
  const expectedStoredState = [
    { isActive: true, numAdults: 2, numChildren: 0 },
    { isActive: true, numAdults: 1, numChildren: 0 },
    { isActive: false, numAdults: 1, numChildren: 0 },
    { isActive: false, numAdults: 1, numChildren: 0 }
  ];
  expect(JSON.parse(localStorage.getItem('state'))).toStrictEqual(null);
  fireEvent.click(getByTestId('submit-button'));
  expect(JSON.parse(localStorage.getItem('state'))).toStrictEqual(
    expectedStoredState
  );
});
