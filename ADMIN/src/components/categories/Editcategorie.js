import React, { useState , useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useDispatch } from "react-redux";
import { updateCategorie, getCategories } from '../../features/categorieSlice';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { UploadFirebase } from '../../Utils/UploadFirebase';
import { buildFormData } from "../../Utils/ConvertFormData";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editcategorie = ({ cat = {} , handlerFeedback}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        window.location.reload();
    };
    const handleShow = () => {
        setShow(true)
        handlerFeedback(false)
    };

    const [validated, setValidated] = useState(false);
    const [visible, setVisible] = useState("");
    const [CodeCat, setCodeCat] = useState("");
    const [DesCat, setDesCat] = useState("");
    const [files, setFiles] = useState("");
    const [Image, setImage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setDesCat(cat.DesCat)
        setCodeCat(cat.CodeCat)
        setVisible(cat.visible_web)
      }, [cat]);


    /* //Dans le cas de multer
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
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (event, url) => {
        event.preventDefault();
        setFiles(url);
        const categorie = {
            visible_web: visible,
            CodeCat: CodeCat,
            DesCat: DesCat,
            Image: url
        }
        if (categorie.Image === undefined) {
            setFiles(cat.Image)
            setImage(cat.Image)
            categorie.Image = cat.Image
        }
        // if (categorie.visible_web === "") {
        //     categorie.visible_web = cat.visible_web
        // }
        // if (categorie.CodeCat === "") {
        //     categorie.CodeCat = cat.CodeCat
        // }
        // if (categorie.DesCat === "") {
        //     categorie.DesCat = cat.DesCat
        // }
        else {
            setFiles(categorie.Image)
        }
        /* if (isFile(categorie.Image)) {
            console.log('It is a File no need to change')
            console.log(files[0].file.name)
        }
        else {
            console.log('It is a Blob, change it to a File')
            categorie.Image = blobToFile(files[0].file, files[0].file.name);
        }
         */

        /*
                  if (isFile(categorie.Image)) {
                      console.log('It is a File no need to change')
                      console.log(files[0].file.name)
                  }
                  else {
                      console.log('It is a Blob, change it to a File')
                      categorie.Image = blobToFile(files[0].file, files[0].file.name);
                  } */
        const formData = new FormData();
        buildFormData(formData, categorie);
        await dispatch(updateCategorie(formData))
            .then(res => {
                setShow(false);
                setDesCat("");
                setImage("");
                setFiles("");
                setVisible("");
                setValidated(false);
            })
            .then(() => handleClose())
        await dispatch(getCategories())
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
                        <Modal.Title> <h1 align="center">Modification Categorie</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container w-100 d-flex justify-content-center">
                            <div>
                                <div className='form mt-3'>
                                    <Row className="mb-2">
                                       <Form.Label>Désignation : </Form.Label>
                                       <Form.Control
                                           required
                                           type="text"
                                           placeholder="Modifier le Nom de la categorie"
                                           value={DesCat}
                                           onChange={(e) => setDesCat(e.target.value)}
                                       />
                                   </Row>
                                    <Row className="mb-2">
                                        <Form.Label>visible dans menu : </Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={visible}
                                            onChange={(e) => setVisible(e.target.value)}
                                        >
                                            <option value="">Visibilité dans le web</option>
                                            <option value="1">Visible</option>
                                            <option value="0">Non visible</option>
                                        </Form.Control>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Label>Image</Form.Label>

                                        <img
                                            src={`${cat.Image}`} width={70} height={200}
                                            alt="" />
                                        <p>Télècharger une nouvelle image</p>
                                        <FilePond
                                            type="file"
                                            files={files}
                                            allowMultiple={false}
                                            onupdatefiles={setFiles}
                                            labelIdle='<span class="filepond--label-action">
                                            Cliquer ici pour télécharger une nouvelle image
                                            </span>'
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
                        <Button variant="primary" type="submit" onClick={(event) => handleUpload(event)}>Modifier</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default Editcategorie