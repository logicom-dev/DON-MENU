import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearCart} from "../redux/actions/addToCart.action"
import "react-toastify/dist/ReactToastify.css";

export default function ModalCommande(props) {
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

  const submit = async () => {
    setLoading(true); // Set loading to true
    const data = {
      email,
      nom,
      numch,
      numtel,
      note,
      cartItem: props.detail,
      prixttc: props.totale,
    };

    try {
      const response = await axios.post("/api/commande", data);
      if (response.status === 200) {
        dispatch(clearCart())
        props.hide();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    if (window.confirm("Are you sure you want to confirm the order?")) {
      submit();
    }
  };

  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };

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
                <h5 className="modal-title">Commande</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <Divider inset="context" />

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
                  <Typography
                    level="body3"
                    sx={{ fontWeight: "md", color: "text.secondary" }}
                  >
                    Montant Total : {props.totale} Dt
                  </Typography>
                  <div className="form-group">
                    {loading ? (
                      <button disabled>Veuillez patienter...</button>
                    ) : (
                      <button
                        style={{
                          width: "100%",
                          margin: "0",
                          border: "0",
                          backgroundColor: "#E4CF59",
                          color: "#fff",
                        }}
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                      >
                        Confirmer
                      </button>
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
