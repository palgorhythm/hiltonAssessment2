import React, { useState, useEffect } from 'react';
import RoomConfig from '../components/RoomConfig';
import uuid from 'uuid';

// const initialState = [];
// for (let i = 0; i < 4; i += 1) {
//   const isActive = i === 0 ? true : false;
//   initialState.push({ isActive: isActive, numAdults: 1, numChildren: 0 });
// }

const App = () => {
  const [configState, setConfigState] = useState([]);

  useEffect(() => {
    const localStorageState = JSON.parse(window.localStorage.getItem('state'));
    if (localStorageState !== null) {
      setConfigState(localStorageState);
    } else {
      const initialState = [];
      for (let i = 0; i < 4; i += 1) {
        const isActive = i === 0 ? true : false;
        initialState.push({ isActive: isActive, numAdults: 1, numChildren: 0 });
      }
      setConfigState(initialState);
    }
  }, []);

  const handleSubmit = () => {
    window.localStorage.setItem('state', JSON.stringify(configState));
  };

  const handleCheckboxClick = cardIndex => {
    const newConfigState = configState.map((roomConfigObj, i) => {
      if (roomConfigObj.isActive) {
        if (i >= cardIndex) {
          return {
            isActive: !roomConfigObj.isActive,
            numAdults: 1,
            numChildren: 0
          };
        } else {
          return { ...roomConfigObj };
        }
      } else {
        if (i <= cardIndex) {
          return {
            ...roomConfigObj,
            isActive: !roomConfigObj.isActive
          };
        }
        return { ...roomConfigObj };
      }
    });
    setConfigState(newConfigState);
  };

  const handleSelect = (e, cardIndex, adultsOrChildren) => {
    const newConfigState = [...configState];
    if (adultsOrChildren === 'adults') {
      newConfigState[cardIndex].numAdults = e.target.value;
    } else {
      newConfigState[cardIndex].numChildren = e.target.value;
    }
    setConfigState(newConfigState);
  };

  const roomConfigs = [];
  for (let i = 0; i < configState.length; i++) {
    roomConfigs.push(
      <RoomConfig
        handleCheckboxClick={handleCheckboxClick}
        handleSelect={handleSelect}
        configState={configState}
        setConfigState={setConfigState}
        roomNumber={i + 1}
        key={uuid()}
      />
    );
  }

  return (
    <div id="app" data-testid="app">
      <main>{roomConfigs}</main>
      {configState.length ? (
        <button
          onClick={() => {
            handleSubmit();
          }}>
          Submit
        </button>
      ) : (
        ''
      )}
      <style jsx>{`
        #app {
          background: #f2fcff;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        main {
          margin-top: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button {
          background: white;
          padding: 10px;
          font-family: inherit;
          font-size: 1.5rem;
          border-radius: 10px;
          box-shadow: 2px 1px 2px 1px rgba(120, 120, 120, 0.2);
          border: 2px solid lightgray;
        }
        button:hover {
          background: gray;
          color: white;
          cursor: pointer;
        }
        button:focus {
          outline: none;
        }
        button:active {
          background: #a5eca1;
        }
      `}</style>
    </div>
  );
};

export default App;
