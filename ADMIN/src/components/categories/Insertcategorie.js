import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch } from "react-redux";
import { buildFormData } from "../../Utils/ConvertFormData";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { createCategorie, getCategories } from '../../features/categorieSlice';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const Insertcategorie = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nomcategorie, setNomcategorie] = useState("");
    const [codecategorie, setCodecategorie] = useState("");
    const [files, setFiles] = useState("")
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const categorie = {
                nomcategorie: nomcategorie,
                codecategorie: codecategorie,
                Image: files[0].file
            }
            const formData = new FormData();
            buildFormData(formData, categorie);
            await dispatch(createCategorie(formData))
                .then(res => {
                    console.log("Insert OK", res);
                    setCodecategorie("");
                    setNomcategorie("");
                    setFiles("");
                    setValidated(false);
                    handleClose()
                })
                .catch(error => {
                    console.log(error)
                    alert("Erreur ! Insertion non effectuée")
                })
            dispatch(getCategories());
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
                        <Modal.Title> <h1 align="center">Ajout Categorie</h1></Modal.Title>
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
                                                placeholder="code categorie"
                                                value={codecategorie}
                                                onChange={(e) => setCodecategorie(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Saisir Référence Categorie
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Désignation *</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="nom categorie"
                                                value={nomcategorie}
                                                onChange={(e) => setNomcategorie(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Saisir Désignation
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
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
export default Insertcategorie
