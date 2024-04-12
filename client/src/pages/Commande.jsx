import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import { increment, decrement  } from '../redux/actions/counter.action';
import {removeFromCart , clearCart} from "../redux/actions/addToCart.action"
import ModalCommande from "../components/ModalCommande";
import "../styles/commande-style.scss";

const Commande = () => {
  const counterReducer = useSelector((state) => state.counterReducer);
  const cartReducer = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [model, setModel] = useState(false);
  const [detail, setDetail] = useState({});

  const getData = () => {
    setDetail(updatedCartReducer);
    setModel(true);
  };


  // Calculate the total
  const calculateTotal = () => {
    let total = 0;
    cartReducer.cartItems.forEach((cartItem) => {
      const productCount = counterReducer.counts[cartItem.CodeArt] || 1; // Get the quantity for the product
      total += cartItem.prix1 * productCount;
    });
    return total;
  };


  const updatedCartReducer = cartReducer.cartItems.map(item => {
    const codeArt = item.CodeArt;
    const cartQuantity = counterReducer.counts[codeArt] || 1;
    return { ...item, cartQuantity };
  });


  const totale = calculateTotal(); // Calculate the total

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecrement = (product) => {
    dispatch(decrement(product.CodeArt)); // Pass the CodeArt of the product
  };

  const handleIncrement = (product) => {
    dispatch(increment(product.CodeArt)); // Pass the CodeArt of the product
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <ToastContainer />
        <h2>Carte</h2>
        {cartReducer.cartItems.length === 0 ? (
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
              {cartReducer.cartItems &&
                cartReducer.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem.CodeArt}>
                    <div className="cart-product">
                      <div>
                        <h3>{cartItem.LibArt}</h3>
                        <p>{cartItem.CodeArt}</p>
                        <button onClick={() => handleRemove(cartItem)}>
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">
                      {cartItem.prix1} TND
                    </div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecrement(cartItem)}>
                        -
                      </button>
                      <div className="count">
                        {counterReducer.counts[cartItem.CodeArt] || 1}
                      </div>{" "}
                      {/* Display the quantity */}
                      <button onClick={() => handleIncrement(cartItem)}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      {cartItem.prix1 *
                        (counterReducer.counts[cartItem.CodeArt] || 1)}{" "}
                      TND {/* Display the total price for this item */}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={handleClearCart}>
                Vider
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Total</span>
                  <span className="amount">{totale} TND</span>{" "}
                  {/* Display the total here */}
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
                  <button
                    style={{ borderRadius: "10px" , backgroundColor: "#E4CF59 "}}
                    onClick={() => getData()}
                  >
                    commander
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {model ? (
              <ModalCommande
                detail={detail}
                totale={calculateTotal()} 
                hide={() => setModel(false)}
              />
            ) : (
              <></>
            )}
    </div>
  );
};

export default Commande;
