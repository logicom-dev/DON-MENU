const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Check if the CodeArt already exists in cartItems
        const isCodeArtExists = state.cartItems.some(item => item.CodeArt === action.payload.CodeArt);
        
        if (isCodeArtExists) {
          return state; // If CodeArt already exists, return the current state
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
          };
        }
      
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.CodeArt !== action.payload.CodeArt),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          cartItems: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  








