import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useDispatch } from "react-redux";
import { updateArticle, getArticles } from "../../features/articleSlice"
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { buildFormData } from "../../Utils/ConvertFormData";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editarticle = ({ art }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [LibArt, setLibArt] = useState(art.LibArt);
    const [CodeArt] = useState(art.CodeArt);
    const [prix1, setprix1] = useState(art.prix1);
    const [Descrip, setDescrip] = useState(art.Descrip);
    const [CodeCat, setCodeCat] = useState(art.CodeCat);
    const [files, setFiles] = useState(art.imagepath);
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
            const article = {

                LibArt: LibArt,
                CodeArt: CodeArt,
                prix1: prix1,
                Descrip: Descrip,
                CodeCat: CodeCat,
                imagepath: files[0].file

            }
            console.log(article.imagepath);

            if (isFile(article.imagepath)) {
                console.log('It is a File no need to change')
                console.log(files[0].file.name)
            }
            else {
                console.log('It is a Blob, change it to a File')
                article.imagepath = blobToFile(files[0].file, files[0].file.name);
            }


            console.log(article.imagepath);
            const formData = new FormData();
            buildFormData(formData, article);
            await dispatch(updateArticle(formData))

            dispatch(getArticles());
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
                                        <Form.Group className="col-md-6 ">
                                            <Form.Label>Code categorie</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="CodeCat"
                                                value={CodeCat}
                                                onChange={(e) => setCodeCat(e.target.value)}
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
                                    </Row>
                                    <Row className="mb-3">

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
export default Editarticle