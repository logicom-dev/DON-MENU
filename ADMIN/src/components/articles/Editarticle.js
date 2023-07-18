import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormControl from "@mui/material/FormControl";
import Col from "react-bootstrap/Col";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Row from "react-bootstrap/Row";
import {
  findCategorieByID,
  getCategories,
} from "../../features/categorieSlice";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { UploadFirebase } from "../../Utils/UploadFirebase";
import { updateArticle, getArticles } from "../../features/articleSlice";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { buildFormData } from "../../Utils/ConvertFormData";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editarticle = ({ art = {}, handlerFeedback }) => {
  const { categories } = useSelector((state) => state.storecategories);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => window.location.reload() , 7000);
    
  };
  const handleShow = () => {
    setShow(true);
    handlerFeedback(false);
  };
  const [validated, setValidated] = useState(false);
  const [LibArt, setLibArt] = useState("");
  const [CodeArt, setCodeArt] = useState("");
  const [prix1, setprix1] = useState("");
  const [Descrip, setDescrip] = useState("");
  const [CodeCat, setCodeCat] = useState("");
  const [visible, setVisible] = useState("");
  const [image_web, setImage_web] = useState("");
  const [files, setFiles] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const GetListCategories = async (idcat) => {
    dispatch(findCategorieByID(idcat));
  };

  useEffect(() => {
    setLibArt(art.LibArt);
    setCodeArt(art.CodeArt);
    setprix1(art.prix1);
    setDescrip(art.Descrip);
    setCodeCat(art.CodeCat);
    setVisible(art.visible_web);
  }, [art]);

  /* // Dans le cas de Multer
    function isFile(obj) {
        return obj.constructor === File;
    }
    function blobToFile(blob, fileName) {
        // Create a new FormData object
        const formData = new FormData();
      
        // Append the Blob object to the FormData object with the specified file name
        formData.append('file', blob, fileName);
      
        // Extract the File object from the FormData object
        const file = formData.get('file');
      
        return file;
      } */
  const handleUpload = (event) => {
    if (!files[0].file) {
      alert("Please upload an image first!");
    }
    resultHandleUpload(files[0].file, event);
  };
  const resultHandleUpload = async (image, event) => {
    try {
      await UploadFirebase(image).then((url) => {
        handleSubmit(event, url);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event, url) => {
    event.preventDefault();
    setFiles(url);
    const article = {
      LibArt: LibArt,
      CodeArt: CodeArt,
      prix1: prix1,
      Descrip: Descrip,
      CodeCat: CodeCat,
      visible_web: visible,
      image_web: url,
    };
    if (article.CodeArt === "") {
      article.CodeArt = art.CodeArt;
    }
    if (article.Descrip === "") {
      article.Descrip = art.Descrip;
    }
    if (article.LibArt === "") {
      article.LibArt = art.LibArt;
    }
    if (article.CodeCat === "") {
      article.CodeCat = art.CodeCat;
    }
    if (article.visible_web === "") {
      article.visible_web = art.visible_web;
    }
    if (article.prix1 === "") {
      article.prix1 = art.prix1;
    }
    if (article.image_web === undefined) {
      
      setFiles(art.image_web);
      setImage_web(art.image_web);
      article.image_web = art.image_web;
    } else {
      setFiles(article.image_web);
    }
    /*  if (isFile(article.imagepath)) {
             console.log('It is a File no need to change')
             console.log(files[0].file.name)
         }
         else {
             console.log('It is a Blob, change it to a File')
             article.imagepath = blobToFile(files[0].file, files[0].file.name);
         } */
    const formData = new FormData();
    buildFormData(formData, article);
    await dispatch(updateArticle(formData))
      .then((res) => {
        setShow(false);
        setLibArt("");
        setprix1("");
        setDescrip("");
        setCodeCat("");
        setFiles("");
        setImage_web("");
        setVisible("");
        setValidated(false);
      })
      .then(() => handleClose());
    await dispatch(getArticles());
    setValidated(true);
  };
  return (
    <>
      <span onClick={handleShow} style={{ cursor: "pointer" }}>
        <NoteAltOutlinedIcon color="success" />
      </span>
      {CodeCat && CodeCat.length !== 0 && (
        <Modal show={show} onHide={handleClose}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                <h3 align="center">
                  Modification Article Code :{" "}
                  <span style={{ color: "#369f12" }}>{CodeCat}</span>
                </h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container w-100 d-flex justify-content-center">
                <div>
                  <div className="form mt-3">
                    <Row className="mb-2">
                      <Form.Group as={Col} md="6">
                        <Form.Label>Code Article :</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          value={CodeArt}
                          disabled="true"
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6">
                        <Form.Label>Visible dans menu:</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={visible}
                          onChange={(e) => setVisible(e.target.value)}
                          style={{
                            border:
                              visible == 1
                                ? "2px solid green"
                                : "2px solid red",
                            boxShadow: "none",
                          }}
                        >
                          <option value="0">Non visible</option>
                          <option value="1">Visible</option>
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                    <Form.Group as={Col} md="12">
                      <Form.Label>Désignation :</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Modifier le nom de l'article"
                        value={LibArt}
                        onChange={(e) => setLibArt(e.target.value)}
                      />
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group className="col-md-6">
                        <Form.Label>Code categorie :</Form.Label>
                        <Row className="mb-2" style={{ marginLeft: "0px" }}>
                          <Form.Control
                            style={{
                              width: 40,
                              height: 40,
                              padding: "0 0 0 7px",
                            }}
                            type="number"
                            placeholder="Modifier la categorie de l'article"
                            value={CodeCat}
                            onChange={(e) => setCodeCat(e.target.value)}
                            disabled="true"
                          />
                          <FormControl style={{ width: 160 }}>
                            <TextField
                              size="small"
                              select
                              defaultValue={CodeCat}
                              label="Catégories"
                              variant="outlined"
                              value={CodeCat}
                              onChange={(event) => {
                                setCodeCat(event.target.value);
                                GetListCategories(event.target.value);
                              }}
                            //   helperText="Sélectionner une catégorie"
                            >
                              {categories
                                ? categories.map((cat) => (
                                    <MenuItem
                                      key={cat.CodeCat}
                                      value={cat.CodeCat}
                                    >
                                      {cat.DesCat}
                                    </MenuItem>
                                  ))
                                : null}
                            </TextField>
                          </FormControl>
                        </Row>
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <Form.Label>Prix :</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Modifier le Prix de l'article"
                          value={prix1}
                          onChange={(e) => setprix1(e.target.value)}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                    <Form.Label>Description :</Form.Label>
                    <Form.Group as={Col} md="12">

                    <Row className="mb-2">
                      {/* <Form.Control
                        type="text"
                        required
                        placeholder="Modifier la description de l'article"
                        value={Descrip}
                        onChange={(e) => setDescrip(e.target.value)}
                      /> */}
                      <TextField
                        type="text"
                        required
                        placeholder="Modifier la description de l'article"
                        value={Descrip}
                        onChange={(e) => setDescrip(e.target.value)}
                        multiline
                        rows={4}
                        maxRows={4}
                      />
                    </Row>
                    </Form.Group>
                    </Row>
                   

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6">
                        <Form.Label>changer l'image de l'article</Form.Label>
                        <FilePond
                          type="file"
                          files={files}
                          allowMultiple={false}
                          onupdatefiles={setFiles}
                          labelIdle='<span class="filepond--label-action"> Cliquer ici pour télécharger une nouvelle image</span>'
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6">
                        <img
                          src={`${art.image_web}`}
                          width={150}
                          height={150}
                          alt=""
                        />
                      </Form.Group>
                    </Row>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={(event) => handleUpload(event)}
              >
                Modifier
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default Editarticle;