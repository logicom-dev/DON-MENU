import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/actions/categoriesActions';
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from 'axios';

const AddCategorieDialog = ({ open, onClose, onAdd }) => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [visible, setVisible] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFiles(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setDisabledButton(true);
      let newCategorie = {};
      if (!files) {
        alert("Please upload an image first!");
        return;
      }
      if (files.name && files.name.length > 50) {
        alert("Le nom de l'image doit être court (inférieur à 50 caractères).");
        return;
      }

      const formData = new FormData();
      formData.append('image', files);
      formData.append('key', '881f6a30630e96747675ad6aa76cb50b');

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const response = await axios.post('https://api.imgbb.com/1/upload', formData, config);
      const imageUrl = response.data.data.url;

      newCategorie = {
        CodeCat: code,
        DesCat: description,
        Image: imageUrl,
        visible_web: visible === true ? 1 : 0,
      };

      await dispatch(addCategory(newCategorie));
      onAdd();

      setCode("");
      setDescription("");
      setFiles(null);
      setVisible(false);
      setImagePreview("");
      setDisabledButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setCode("");
    setDescription("");
    setFiles(null);
    setVisible(false);
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Ajouter un categorie
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
        <DialogContentText>
          Veuillez entrer les détails pour le nouvel categorie :
        </DialogContentText>
        <TextField
          label="Code"
          fullWidth
          margin="normal"
          size="small"
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  color="primary"
                />
              }
              label="Visible"
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="file-input"
              onChange={handleImageChange}
            />
            <label htmlFor="file-input">
              <IconButton component="span">
                <CloudUploadIcon />
              </IconButton>
            </label>
            <span>Upload Image</span>
          </Grid>

          {imagePreview && (
            <Grid item>
              <Card>
                <CardMedia
                  component="img"
                  alt="Sample Image"
                  height="140"
                  image={imagePreview}
                  style={{ maxHeight: "100px", width: "auto" }}
                />
              </Card>
            </Grid>
          )}
        </Grid>
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
        <Button
          disabled={disabledButton}
          onClick={handleSubmit}
          variant="contained"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategorieDialog;

