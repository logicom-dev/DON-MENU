import React, { useState, useEffect }  from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Divider,
  Grid,
  IconButton,
  Typography,
  CardContent
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const DetailCommandeDialog = ({ open, onClose , commandeData }) => {
  const [displayedCommande, setDisplayedCommande] = useState({});

  useEffect(() => {
    setDisplayedCommande(commandeData);
  }, [commandeData]);
  console.log("displayedCommande?.com_data" , displayedCommande?.com_data?.cartItem)


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Detail de commande
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between" , flexWrap: "wrap" }}>
  {displayedCommande?.com_data?.cartItem.map((item, index) => (
    <Grid item key={index}>
      <Card style={{height: "240px" , width: "180px"}}>
        <CardMedia
          component="img"
          alt={item.LibArt}
          height="140"
          image={item.image_web}
          style={{ maxHeight: "100px", width: "auto" }}
        />
        <CardContent>
          <Typography variant="body1">{item.LibArt}</Typography>
          <Typography variant="body2">{item.Descrip}</Typography>
          <Typography variant="body2">Price: {item.prix1}</Typography>
          <Typography variant="body2">Quantity: {item.cartQuantity}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
        <TextField
          focused
          label="Numéro table"
          fullWidth
          margin="normal"
          size="small"
          value={displayedCommande?.com_data?.numch}
        />
        <TextField
          focused
          label="Nom"
          fullWidth
          margin="normal"
          size="small"
          value={displayedCommande?.com_data?.nom}

        />
        <TextField 
          focused
          label="Remarque"
          fullWidth
          margin="normal"
          size="small"
          value={displayedCommande?.com_data?.note}
        />
       <TextField
          focused
          label="Total TTC"
          fullWidth
          margin="normal"
          size="small"
          value={displayedCommande?.com_data?.prixttc}
        />
            {/* <Grid item>
              <Card>
                <CardMedia
                  component="img"
                  alt="Sample Image"
                  height="140"
                  //image={imagePreview}
                  style={{ maxHeight: "100px", width: "auto" }}
                />
              </Card>
             </Grid> */}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          style={{ backgroundColor: "#6C757D", color: "white" }}
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailCommandeDialog;
