import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import RoomConfig from './RoomConfig';
describe('RoomConfig', () => {
  const initialMockState = [];
  for (let i = 0; i < 4; i += 1) {
    const isActive = i === 0 ? true : false;
    initialMockState.push({ isActive: isActive, numAdults: 1, numChildren: 0 });
  }

  const testProps = {
    configState: initialMockState,
    roomNumber: 1
  };
  it('should render correctly in "debug" mode', () => {});
});
