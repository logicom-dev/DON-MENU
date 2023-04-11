import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useDispatch } from "react-redux";
import { updateCategorie, getCategories } from '../../features/categorieSlice';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { buildFormData } from "../../Utils/ConvertFormData";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editcategorie = ({ cat }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [CodeCat] = useState(cat.CodeCat);
    const [DesCat, setDesCat] = useState(cat.DesCat);
    const [files, setFiles] = useState(cat.Image);
    const dispatch = useDispatch();
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
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const categorie = {

                CodeCat: CodeCat,
                DesCat: DesCat,
                Image: files[0].file

            }
            console.log(categorie.Image);

            if (isFile(categorie.Image)) {
                console.log('It is a File no need to change')
                console.log(files[0].file.name)
            }
            else {
                console.log('It is a Blob, change it to a File')
                categorie.Image = blobToFile(files[0].file, files[0].file.name);
            }


            console.log(categorie.Image);
            const formData = new FormData();
            buildFormData(formData, categorie);
            await dispatch(updateCategorie(formData))

            dispatch(getCategories());
        }
        setValidated(true);


    };
    return (
        <>
            <span
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            >
                <NoteAltOutlinedIcon color='success' />
            </span>
            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title> <h1 align="center">Modification Article</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container w-100 d-flex justify-content-center">
                            <div>
                                <div className='form mt-3'>
                                    <Row className="mb-2">


                                        <Form.Label>Désignation *</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nom categorie"
                                            value={DesCat}
                                            onChange={(e) => setDesCat(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Saisir Désignation
                                        </Form.Control.Feedback>

                                    </Row>

                                    <Row className="mb-2">

                                       
                                            <Form.Label>Image</Form.Label>
                                            <FilePond
                                                type="file"
                                                files={files}
                                                allowMultiple={false}
                                                onupdatefiles={setFiles}
                                                labelIdle='<span class="filepond--label-action">Browse
One</span>'
                                            />

                                        
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
export default Editcategorie