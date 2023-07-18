import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Navbarre";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

export default function Commandes() {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API + "/postCommande");
        setCommandes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (comData) => {
    setSelectedCommande(comData);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedCommande(null);
    setShowPopup(false);
  };

  return (
    <>
      <Menu />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
           
            <TableCell>Nom</TableCell>
            <TableCell>Numéro de table</TableCell>
            <TableCell>Remarque</TableCell>
            <TableCell>Prix TTC</TableCell>
            <TableCell>Détails</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {commandes.map((commande) => (
            <TableRow
              key={commande.id_cmd}
            >
              <TableCell>{commande.id_cmd}</TableCell>
              
              <TableCell>{commande.com_data.nom}</TableCell>
              <TableCell>{commande.com_data.numch}</TableCell>
              <TableCell>{commande.com_data.note}</TableCell>
              <TableCell>{commande.com_data.prixttc}</TableCell>
              <TableCell onClick={() => handleRowClick(commande.com_data)}><RemoveRedEyeIcon color="secondary"/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showPopup} onClose={closePopup}>
        <DialogTitle style={{textAlign: "center"}}><strong>COMMENDE DETAILS</strong></DialogTitle>
        <DialogContent style={{width: "500px" , border: "1px solid #7C7C7D" , borderRadius: "5px" , margin : "5px"}}>
        {
             selectedCommande &&  selectedCommande.cartItem.map((val , index) =>(
                <span key={index} style={{display : "flex" , flexDirection: "column" }}>
                <Typography  style={{display : "flex" , alignItems: "center" , margin:  "5px 0 5px 0"}} variant="CodeArt">
                  <strong style={{width: "100px"}}>Code article:</strong> 
                  <p style={{margin: "0 0 0 10px" , width: "200px"}}>{val.CodeArt}</p>
                </Typography>
                <Typography style={{display : "flex" , justifyContent: "space-between" , margin:  "5px 0 5px 0"}} variant="Descrip">
                  <strong style={{width: "100px"}}>Description:</strong> 
                  <p style={{marginLeft: "10px" , width: "340px"}}>{val.Descrip}</p>
                </Typography>
                <Typography style={{display : "flex"  , margin:  "5px 0 5px 0"}} variant="LibArt">
                  <strong style={{width: "100px"}}>libellé :</strong> 
                  <p style={{marginLeft: "10px" , width: "200px"}}>{val.LibArt}</p>
                </Typography>
                <Typography style={{display : "flex"  , margin:  "5px 0 5px 0"}} variant="cartQuantity">
                  <strong style={{width: "100px"}}>Quantity :</strong> 
                  <p style={{marginLeft: "10px" , width: "200px"}}>{val.cartQuantity}</p>
                </Typography>
                <Typography style={{display : "flex" , alignItems: "center"  , margin:  "5px 0 5px 0"}} variant="cartQuantity">
                    <>
                       <strong style={{width: "100px"}}>image :</strong> 
                       <img style={{marginLeft: "10px"}} width={200} height={150} src={val.image_web} alt="error"/>
                    </>
                 
                </Typography>
                <hr/>
                <hr/>
                </span>

             ))
        }
        

        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
