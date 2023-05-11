import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import storage from "../../firebaseConfig";
import { ref } from "firebase/storage";
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

const Editcategorie = ({ cat }) => {

    console.log(cat.Image)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [CodeCat, setCodeCat] = useState(cat.CodeCat);
    const [DesCat, setDesCat] = useState(cat.DesCat);
    const [files, setFiles] = useState("");
    const [Image, setImage] = useState("");


    /*  useEffect(() => {
        cat.Image.getDownloadURL().then((url) => {
           fetch(url)
             .then((res) => res.blob())
             .then((blob) => {
               const file = new File([blob], "filename.jpg", { type: "files/jpg" });
               setFiles(file);
             });
         });
       }, []);
  */

    const dispatch = useDispatch();

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
            console.log("Please upload an image first!")
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
        setFiles(url);
        const categorie = {

            CodeCat: CodeCat,
            DesCat: DesCat,
            Image: url

        }
        console.log(categorie.Image);
        if( categorie.Image === undefined) {
            console.log("the image category is undefined")
            console.log(cat.Image)
            setFiles(cat.Image)
            setImage(cat.Image)
            categorie.Image = cat.Image
           }

        else {
            console.log("Vous avez changer l'image de votre categorie")
            console.log(categorie.Image)
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
        console.log(categorie)
        await dispatch(updateCategorie(formData))
            .then(res => {
                console.log("edit OK", res);
                setShow(false);
                setDesCat("");
                setImage("");
                setFiles("");
                setValidated(false);
            })

        await dispatch(getCategories());

        // setValidated(true);


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