## Hilton UI Assessment 2 Explanation

My approach for this assessment was to maximize reusability, simplicity of components (enabled partially by using hooks), and code maintainability through comprehensive testing (I achieved 92.86% code coverage).

I built a reusable RoomConfig component that would encapsulate the display and functionality of each room, including a checkbox and drop-down fields for choosing the number of adults and number of children in each room. Both the drop-downs and the checkbox are controlled components. When a user clicks a checkbox or changes a selection in a drop-down, a RoomConfig component uses methods from the container App component that were passed down as props to change state, which propagates down to all RoomConfig components. This allows (most importantly) for the aspects of functionality detailed in specs 2 and 5 of the README, which involves the results of a change/click event on one RoomConfig propagating to other RoomConfigs.

The App component uses Hooks to maximize simplicity and to keep all components lightweight. The useState hook is used for state, and the useEffect hook is used to initialize state on component render, which also takes into account data stored in localStorage.

I used Styled JSX for styling, which allows for encapsulated and scoped CSS. I used Flexbox to ensure responsiveness for all screen sizes.

I wrote tests that cover each of the specifications in the README as closely as possible. Through simulating DOM events, such as clicks on buttons/checkboxes or change events on dropdowns, I test presentational results of user interaction without unnecessarily diving into implementation details. I chose react-testing-library because of its focus on user experience, rather than focusing on React state changes.
