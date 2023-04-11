import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch } from "react-redux";
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
    const [validated, setValidated] = useState(false);
    const [LibArt, setLibArt] = useState("");
    const [CodeArt, setCodeArt] = useState("");
    const [prix1, setprix1] = useState("");
    const [Descrip, setDescrip] = useState("");
    const [CodeCat, setCodeCat] = useState("");
    const [files, setFiles] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const article = {
                LibArt: LibArt,
                CodeArt: CodeArt,
                prix1: prix1,
                Descrip: Descrip,
                CodeCat: CodeCat,
                imagepath: files[0].file
            }
            const formData = new FormData();
            buildFormData(formData, article);
            await dispatch(createArticle(formData))
                .then(res => {
                    console.log("Insert OK", res);
                    setCodeArt("");
                    setLibArt("");
                    setprix1("");
                    setDescrip("");
                    setFiles("");
                    setCodeCat("")
                    setValidated(false);
                    handleClose()
                })
                .catch(error => {
                    console.log(error)
                    alert("Erreur ! Insertion non effectuée")
                })
            dispatch(getArticles());
        }
        setValidated(true);
    };
    return (
        <>
            <Button variant="success" style={{ 'margin': 10, 'left': 10 }}
                onClick={handleShow}>
                + Nouveau
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title> <h1 align="center">Ajout Article</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container w-100 d-flex justify-content-center">
                            <div>
                                <div className='form mt-3'>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} md="6" >
                                            <Form.Label >Référence *</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="CodeArt"
                                                value={CodeArt}
                                                onChange={(e) => setCodeArt(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Saisir Référence Article
                                            </Form.Control.Feedback>
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
                                            <Form.Control.Feedback type="invalid">
                                                Saisir Désignation
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group className="col-md-6">
                                            <Form.Label>Description</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    placeholder="Description"
                                                    value={Descrip}
                                                    onChange={(e) => setDescrip(e.target.value)}
                                                />
                                            </InputGroup>
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
                                            <Form.Label>Image</Form.Label>
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
                                
                                        
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default Insertarticle