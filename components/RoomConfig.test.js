import React from 'react';
import { shallow } from 'enzyme';
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
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RoomConfig debug {...testProps} />);

    expect(component).toMatchSnapshot();
  });
});
