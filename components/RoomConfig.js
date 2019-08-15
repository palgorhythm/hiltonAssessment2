import React from 'react';

const RoomConfig = props => {
  const componentState = props.configState[props.roomNumber - 1];
  return (
    <div
      className={`${'room-container ' +
        (componentState.isActive ? 'active' : 'inactive')}`}>
      <h2>
        {props.roomNumber !== 1 ? (
          <input
            type="checkbox"
            checked={componentState.isActive}
            onChange={() => {
              props.handleCheckboxClick(
                props.roomNumber - 1,
                props.configState,
                props.setConfigState
              );
            }}
          />
        ) : (
          ''
        )}
        Room {props.roomNumber}
      </h2>
      <div className="room">
        <div className="dropdown-container">
          <h3>
            Adults
            <br />
            (18+)
          </h3>
          <select
            disabled={!componentState.isActive}
            value={componentState.numAdults}
            onChange={val => {
              props.handleSelect(val, props.roomNumber - 1, 'adults');
            }}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="dropdown-container">
          <h3>
            Children
            <br />
            (0-17)
          </h3>
          <select
            disabled={!componentState.isActive}
            value={componentState.numChildren}
            onChange={val => {
              props.handleSelect(val, props.roomNumber - 1, 'children');
            }}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        .room-container {
          display: flex;
          flex-direction: column;
          width: 200px;
          margin: 20px;
          background: lightgray;
          border-radius: 5px;
          border: 2px solid black;
          padding: 10px;
          box-shadow: 2px 1px 2px 1px rgba(120, 120, 120, 0.2);
        }

        .inactive {
          background: #aaa;
          border-color: gray;
        }

        .active .room {
          background: white;
        }
        .inactive .room {
          background: transparent;
        }
        .room {
          padding: 20px;
          display: flex;
          justify-content: space-around;
          border-radius: 5px;
        }
        h3 {
          margin: 0.5rem 0px;
        }
        input[type='checkbox'] {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          margin: 0px 4px 0px 0px;
          background: white;
          border-radius: 5px;
          border: 2px solid #555;
        }
        input[type='checkbox']:checked {
          background: #a5eca1;
        }
        input[type='checkbox']:hover {
          cursor: pointer;
        }
        input[type='checkbox']:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default RoomConfig;
