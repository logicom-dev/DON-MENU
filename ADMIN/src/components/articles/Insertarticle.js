import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { findCategorieByID, getCategories } from "../../features/categorieSlice"
import { UploadFirebase } from '../../Utils/UploadFirebase';
import { createArticle, getArticles } from "../../features/articleSlice"
import { buildFormData } from "../../Utils/ConvertFormData";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const Insertarticle = () => {
    const { categories } = useSelector((state) => state.storecategories);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [LibArt, setLibArt] = useState("");
    const [CodeArt, setCodeArt] = useState("");
    const [prix1, setprix1] = useState("");
    const [Descrip, setDescrip] = useState("");
    const [CodeCat, setCodeCat] = useState("");
    const [files, setFiles] = useState("");
    const [Image ,setImage_web] = useState("");
    const [Validated, setValidated] = useState(false);
    const [visible, setVisible] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const GetListCategories = async (idcat) => {
        dispatch(findCategorieByID(idcat));
    }
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
            })
        } catch (error) {
            console.log(error);
        }
    }
    // const handleSubmit = async (event, url) => {
    //     event.preventDefault();
    //     setImage_web(url);
    //     const article = {
    //         LibArt: LibArt,
    //         CodeArt: CodeArt,
    //         prix1: prix1,
    //         Descrip: Descrip,
    //         CodeCat: CodeCat,
    //         image_web: url
    //     }
    //     const formData = new FormData();
    //     buildFormData(formData, article);
    //     console.log(article)
    //     await dispatch(createArticle(formData))
    //         .then(res => {
    //             console.log("Insert OK", res);
    //             setShow(false);
    //             setLibArt("");
    //             setCodeArt("");
    //             setCodeCat("");
    //             setprix1("");
    //             setDescrip("");
    //             setValidated(false);
    //         })
    //     await dispatch(getArticles());
    // };


        const handleSubmit = async (event, url) => {
        event.preventDefault();
        setImage_web(url);
        const article = {
            LibArt: LibArt,
            CodeArt: CodeArt,
            prix1: prix1,
            Descrip: Descrip,
            CodeCat: CodeCat,
            visible_web: visible,
            image_web: url
        }
        const formData = new FormData();
        buildFormData(formData, article);
        await dispatch(createArticle(formData))
            .then(res => {

                setShow(false);
                setLibArt("");
                setCodeArt("");
                setCodeCat("");
                setprix1("");
                setDescrip("");
                setValidated(false);
            })
        await dispatch(getArticles());
    };
    return (
        <>
            <Button variant="success" style={{ 'margin': 10, 'left': 10 }}
                onClick={handleShow}>
                + Nouveau
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 align="center">Ajouter Article</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Row className="mb-2">
                    <Form.Group as={Col} md="6" >
                                <Form.Label >Code article *</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="CodeArt"
                                    value={CodeArt}
                                    onChange={(e) => setCodeArt(e.target.value)}
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

                    <Form.Group as={Col} md="6">
                                <Form.Label>Sélectionner une image</Form.Label>
                                <FilePond
                                    type="file"
                                    files={files}
                                    allowMultiple={false}
                                    onupdatefiles={setFiles}
                                    labelIdle='<span class="filepond--label-action">Browse One</span>'
                                />
                    </Form.Group>


                    </Form >
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" type="submit" onClick={(event) => handleUpload(event)}>Ajouter</Button>
                </Modal.Footer>
            </Modal >



            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 align="center">Ajout Article</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="6" >
                                <Form.Label >Code article *</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="CodeArt"
                                    value={CodeArt}
                                    onChange={(e) => setCodeArt(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Désignation *</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="LibArt"
                                    value={LibArt}
                                    onChange={(e) => setLibArt(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group className="col-md-6">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Description"
                                    value={Descrip}
                                    onChange={(e) => setDescrip(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Prix"
                                    value={prix1}
                                    onChange={(e) => setprix1(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="6">

                                <Form.Label>Code categorie</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="CodeCat"
                                    value={CodeCat}
                                    onChange={(e) => setCodeCat(e.target.value)}
                                />
                                <FormControl style={{ width: 200 }}>
                                    <TextField
                                        select
                                        label="Catégories"
                                        variant="outlined"
                                        value={CodeCat}
                                        style={{ width: "200", marginLeft: 8 }}
                                        onChange={(event) => {
                                            setCodeCat(event.target.value); GetListCategories(event.target.value)
                                        }}
                                        helperText="Sélectionner une catégorie"
                                    >
                                        {
                                            categories ?
                                                categories.map(cat =>
                                                    <MenuItem key={cat.CodeCat}
                                                        value={cat.CodeCat}>{cat.DesCat}
                                                    </MenuItem>
                                                )
                                                : null
                                        }
                                    </TextField>
                                </FormControl>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Sélectionner une image</Form.Label>
                                <FilePond
                                    type="file"
                                    files={files}
                                    allowMultiple={false}
                                    onupdatefiles={setFiles}
                                    labelIdle='<span class="filepond--label-action">Browse One</span>'
                                />
                            </Form.Group>
                        </Row>
                    </Form >
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" type="submit" onClick={(event) => handleUpload(event)}>Ajouter</Button>
                </Modal.Footer>
            </Modal > */}
        </>
    )
}
export default Insertarticle