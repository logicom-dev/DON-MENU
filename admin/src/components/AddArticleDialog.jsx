import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from '../redux/actions/articlesActions';
import { fetchCategories } from "../redux/actions/categoriesActions";
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
import MenuItem from "@mui/material/MenuItem";
import Select   from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from 'axios';

const AddArticleDialog = ({ open, onClose, onAdd }) => {
  const categories = useSelector((state) => state.categories);

  const [codeArticle, setCodeArticle] = useState("");
  const [description, setDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [files, setFiles] = useState(null);
  const [visible, setVisible] = useState(false);
  const [codeCat, setCodeCat] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [prix, setPrix] = useState("");
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
      let newArticle = {};
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

      newArticle = {
        CodeArt: codeArticle,
        Descrip: description,
        LibArt: designation,
        CodeCat: codeCat,
        prix1: prix,
        image_web: imageUrl,
        visible_web: visible === true ? 1 : 0,
      };

      await dispatch(addArticle(newArticle));
      onAdd();

      setCodeArticle("");
      setDescription("");
      setDesignation("");
      setPrix("");
      setCodeCat("");
      setFiles(null);
      setVisible(false);
      setImagePreview("");
      setDisabledButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setCodeArticle("");
    setDescription("");
    setDesignation("");
    setPrix("");
    setCodeCat("");
    setFiles(null);
    setVisible(false);
    setImagePreview("");
    onClose();
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Ajouter un article
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
          Veuillez entrer les détails pour le nouvel article :
        </DialogContentText>
        <TextField
          label="Code"
          fullWidth
          margin="normal"
          size="small"
          value={codeArticle}
          onChange={(e) => setCodeArticle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Désignation"
          fullWidth
          margin="normal"
          size="small"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <FormControl sx={{margin: "17px 0 10px 7px" , width: "230px"}} size="small">
            <InputLabel id="demo-select-small-label">Code Categorie</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={codeCat}
              label="Code Categorie"
              onChange={(event ) => setCodeCat(event.target.value)}
            >
              {categories && categories.categories && categories.categories.map((val , index) => (
                <MenuItem key={index} value={val.CodeCat}>{val.DesCat}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <TextField
            label="Prix"
            margin="normal"
            size="small"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </Grid>

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

export default AddArticleDialog;

