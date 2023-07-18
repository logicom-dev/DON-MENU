import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../features/cartSlice";
import { Link } from "react-router-dom";
import Modal from '../../Components/Modal2';
const Cart = () => {
  const buttonBgColor = process.env.REACT_APP_BTN_COLOR;
  const buttonStyle = {
    backgroundColor: buttonBgColor,
    color: ' #cae447',
    width: '10.5rem',
    borderRadius: '10px',
    height: '40px',
    marginLeft: '20px',
    border: 'none'
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const [model, setModel] = useState(false);
  const [tempData, setTempdata] = useState([]);
  const getData = (prix1, cartItem) => {
    let tempData = [prix1, cartItem];
    setTempdata(item => [1, ...tempData]);
    return setModel(true);
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    
    <div className="cart-container">
      <ToastContainer />
      <h2>Carte</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Votre carte est actuellement vide</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Ajouter des produits</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Produit</h3>
            <h3 className="price">Prix</h3>
            <h3 className="quantity">Quantité</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.CodeArt}>
                  <div className="cart-product">
                    <div>
                      <h3>{cartItem.LibArt}</h3>
                      <p>{cartItem.CodeArt}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">{cartItem.prix1} TND</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}> + </button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.prix1 * cartItem.cartQuantity} TND
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Vider
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Total</span>
                <span className="amount">{cart.cartTotalAmount} TND</span>
              </div>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Ajouter autres articles</span>
                </Link>
                <button className="btn-primary" style={{borderRadius:"10px"}} onClick={() => getData(cart.cartTotalAmount, cart.cartItems)} >
                  commander
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
      {
        model === true ? <Modal prix1={tempData[1]} cartItem={tempData[2]} hide={() => setModel(false)} /> : ''
      }
    </div>
  );
};


export default Cart;

