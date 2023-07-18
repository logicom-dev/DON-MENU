import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Modal(props) {
  const buttonBgColor = process.env.REACT_APP_BTN_COLOR;
  const buttonStyle = {
    backgroundColor: buttonBgColor,
    color: "#fff",
    width: "100%",
    borderRadius: "10px",
    height: "40px",
    border: "none",
    margin: "0 0 0 0",
  };
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [numch, setNumch] = useState("");
  const [numtel, setNumtel] = useState("");
  const [note, setNote] = useState("");
  const handleNumtelChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove any non-digit characters
    const maxLength = 11; // Maximum allowed length
    if (sanitizedValue.length <= maxLength) {
      setNumtel(sanitizedValue);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const data = {
      email,
      nom,
      numch,
      numtel,
      note,
      cartItem: props.cartItem,
      prixttc: props.prix1,
    };
    // const formData = new FormData();
    // buildFormData(formData, data);
    try {
      const response = await axios.post(process.env.REACT_APP_API + "/postCommande", data );
      // const response = await axios.post("http://localhost:3000/api/postCommande", data );
      if (response.status === 200) {
        dispatch(clearCart());
        setEditValue(true);
        toast.success("Votre commande a été bien reçue");
        setTimeout(() => {
          props.hide();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false); // Set loading back to false after the request is completed
  };

  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  const [editValue, setEditValue] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
    props.hide();
  };
  return (
    <section>
      <ToastContainer />

      {showModal && (
        <div className="modal show fade" style={modelStyle}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.LibArt}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <Divider inset="context" />

                <Typography
                  level="body3"
                  sx={{ fontWeight: "md", color: "text.secondary" }}
                >
                  Vous allez payer un montant de : {props.prix1} Dt
                </Typography>
                <form onSubmit={submit}>
                  <div className="form-group">
                    <label htmlFor="name">Nom et Prénom:</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Numéro de table:</label>
                    <input
                      type="text"
                      id="numero"
                      className="form-control"
                      value={numch}
                      onChange={(e) => setNumch(e.target.value)}
                      inputMode="numeric"
                      pattern="\d*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Remarque:</label>
                    <textarea
                      id="address"
                      className="form-control"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    {loading ? (
                      <button  disabled>
                        Veuillez patienter...
                      </button>
                    ) : (
                      <button className="btn-primary" style={{width: "100%" ,margin : "0" , border : "0"}} type="submit" >Confirmer</button>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
