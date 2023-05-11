import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UploadFirebase } from '../../Utils/UploadFirebase';
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
    const [Image, setImage] = useState("");
    const [files, setFiles] = useState("")
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
        setImage(url);
        const categorie = {
            nomcategorie: nomcategorie,
            codecategorie: codecategorie,
            Image: url
        }
        const formData = new FormData();
        buildFormData(formData, categorie);
        console.log(categorie);
        await dispatch(createCategorie(formData))
            .then(res => {
                console.log("Insert OK", res);
                setShow(false);
                setCodecategorie("");
                setNomcategorie("");
                setImage("");
                setFiles("");
                setValidated(false);
            })
            await dispatch(getCategories())

    };

    return (
        <>
            <Button variant="success" style={{ 'margin': 10, 'left': 10 }}
                onClick={handleShow}>
                + Nouveau
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <h1 align="center">Ajout Categorie</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' >
                            <Form.Label >Référence *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="code categorie"
                                value={codecategorie}
                                onChange={(e) => setCodecategorie(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Désignation *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="nom categorie"
                                value={nomcategorie}
                                onChange={(e) => setNomcategorie(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h4>Sélectionner une image</h4>
                            <FilePond
                                type="file"
                                files={files}
                                allowMultiple={false}
                                onupdatefiles={setFiles}
                                labelIdle='<span class="filepond--label-action">Browse
One</span>'
                            />
                        </Form.Group>

                    </Form>
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
export default Insertcategorie
