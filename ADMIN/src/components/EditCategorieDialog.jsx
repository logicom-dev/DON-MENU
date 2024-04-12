import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { editeCategory } from '../redux/actions/categoriesActions';
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

const EditCategorieDialog = ({ open, onClose, onAdd, initialCategory }) => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [visible, setVisible] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setCode(initialCategory.CodeCat);
      setDescription(initialCategory.DesCat);
      setVisible(initialCategory.visible_web === 1);
      setImagePreview(initialCategory.Image);
    }
  }, [initialCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFiles(file);

    // Set image preview URL
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleSubmit = async () => {
    try {
      setDisabledButton(true);
      let EditCategorie = {};

      if (!files && !imagePreview) {
        alert("Please upload an image first!");
      }
      if (files.name && files.name.length > 50) {
        alert("The image name should be short (less than 50 characters).");
      }
      if (imagePreview) {
        EditCategorie = {
          CodeCat: code,
          DesCat: description,
          Image: imagePreview,
          visible_web: visible === true ? 1 : 0, 
        };
        await dispatch(editeCategory(code, EditCategorie)).then(() => {
          resetForm();
          onAdd();
        });
      }

      if (files) {
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

        EditCategorie = {
          CodeCat: code,
          DesCat: description,
          Image: imageUrl,
          visible_web: visible === true ? 1 : 0, 
        };

        await dispatch(editeCategory(code, EditCategorie)).then(() => {
          resetForm();
          onAdd();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCode("");
    setDescription("");
    setFiles("");
    setVisible("");
    setImagePreview("");
    setDisabledButton(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Edit a category
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
          Please enter the details for the category.
        </DialogContentText>
        <TextField
          label="Code"
          fullWidth
          margin="normal"
          size="small"
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
          onClick={handleClose}
          color="primary"
          style={{ backgroundColor: "#6C757D", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          disabled={disabledButton}
          onClick={handleSubmit}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategorieDialog;

