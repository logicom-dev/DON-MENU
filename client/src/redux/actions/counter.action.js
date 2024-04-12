// export const increment = () => {
//     return {
//       type: 'INCREMENT',
//     };
//   };

//   export const decrement = () => {
//     return {
//       type: 'DECREMENT',
//     };
//   };
  


// src/redux/actions/counter.action.js
export const increment = (id) => {
  return {
    type: 'INCREMENT',
    payload: id,
  };
};

export const decrement = (id) => {
  return {
    type: 'DECREMENT',
    payload: id,
  };
};
