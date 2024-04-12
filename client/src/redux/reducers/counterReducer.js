// const initialState = {
//     count: 1,
//   };
  
//   const counterReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return {
//           ...state,
//           count: state.count + 1,
//         };
//       case 'DECREMENT':
//         return {
//           ...state,
//           count: state.count > 1 ? state.count - 1 : 1,
//         };
//       default:
//         return state;
//     }
//   };
  
  
//   export default counterReducer;

// src/redux/reducers/counterReducer.js
const initialState = {
  counts: {}, // Use an object to store counts by product id
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const { payload: incrementId } = action;
      return {
        ...state,
        counts: {
          ...state.counts,
          [incrementId]: (state.counts[incrementId] || 0) + 1,
        },
      };
    case 'DECREMENT':
      const { payload: decrementId } = action;
      const updatedCounts = { ...state.counts };
      if (updatedCounts[decrementId] > 1) {
        updatedCounts[decrementId] -= 1;
      }
      return {
        ...state,
        counts: updatedCounts,
      };
    default:
      return state;
  }
};

export default counterReducer;

  