import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch } from "react-redux";
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [LibArt, setLibArt] = useState("");
    const [CodeArt, setCodeArt] = useState("");
    const [prix1, setprix1] = useState("");
    const [Descrip, setDescrip] = useState("");
    const [CodeCat, setCodeCat] = useState("");
    const [files, setFiles] = useState("");
    const [image_web, setImage_web] = useState("");
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const handleUpload = (event) => {
        if (!files[0].file) {
            alert("Please upload an image first!");
        }
        console.log(files[0].file)
        resultHandleUpload(files[0].file, event);

    };

    const resultHandleUpload = async (image, event) => {


        try {

            await UploadFirebase(image).then((url) => {
                console.log(url);

                handleSubmit(event, url);
            })

        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (event, url) => {
        event.preventDefault();
        setImage_web(url);
        const article = {
            LibArt: LibArt,
            CodeArt: CodeArt,
            prix1: prix1,
            Descrip: Descrip,
            CodeCat: CodeCat,
            image_web: url
        }
        const formData = new FormData();
        buildFormData(formData, article);
        console.log(article)
        await dispatch(createArticle(formData))
            .then(res => {
                console.log("Insert OK", res);
                setShow(false);
                setLibArt("");
                setCodeArt("");
                setCodeCat("");
                setprix1("");
                setDescrip("");
                setImage_web("");
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
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Sélectionner une image</Form.Label>
                            <FilePond
                                type="file"
                                files={files}
                                allowMultiple={false}
                                onupdatefiles={setFiles}
                                labelIdle='<span class="filepond--label-action">Browse
One</span>'
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
                
            </Modal >
        </>
    )
}
export default Insertarticle