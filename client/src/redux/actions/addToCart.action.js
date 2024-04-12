
// src/redux/actions/cartActions.js
export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: product,
  };
};

// src/redux/actions/counter.action.js
export const increment = (product) => {
  return {
    type: 'INCREMENT',
    payload: product,
  };
};

export const decrement = (product) => {
  return {
    type: 'DECREMENT',
    payload: product,
  };
};

// src/redux/actions/cartActions.js
export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};

