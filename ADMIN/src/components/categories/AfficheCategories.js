import React, { useRef, useState , useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import { deleteCategorie } from "../../features/categorieSlice";
import Insertcategorie from "./Insertcategorie";
import { fetchCategorieById } from '../../services/CategorieService';
import Editcategorie from "./Editcategorie";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { getCategories } from '../../features/categorieSlice'

const AfficheCategories = () => {
    const [categorie, setcategorie] = useState([]);
    const [getpermission, setGetpermission] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);

    const handlerFeedback = () => {
        setGetpermission(false)
    }

    const handleEdit = (value) => {
        if(getpermission){
            fetchCategorieById(value)
            .then((res) => {
                setcategorie(res.data);
            })
        }
    };
    const { categories, isLoading, error } = useSelector((state) => state.storecategories);
    const tableRef = useRef(null);
    const handleDelete = (id) => {
        if (window.confirm("supprimer Categorie O/N")) {
            dispatch(deleteCategorie(id));
        }
    }
    const columns = [
        {
            label: "Code",
            name: "CodeCat",
            options: {
                filter: false,
            }
        },
        {
            label: "Désignation",
            name: "DesCat",
            options: {
                filter: false,
            }
        },
        {
            label: "Visibilité",
            name: "visible_web",
            options: {
                filter: false,
            }
           
        },

        {
            label: "Image",
            name: "Image",
            options: {
                customBodyRender: (Image) => (
                    <img
                        src={`${Image}`} width={170} height={120}
                        alt="" />
                ),
                filter: false
            }
        },
        {
            name: "CodeCat",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                    <span
                        onClick={(e) => handleEdit(value)}
                        style={{ cursor: 'pointer' }}
                    >                   
                    <Editcategorie handlerFeedback={handlerFeedback} cat={categorie[0]} />

                    </span>
                    <span
                        onClick={(e) => handleDelete(value)}
                        style={{ cursor: 'pointer' }}
                    >
                        <DeleteForeverRoundedIcon color='error' />
                    </span>
                </div>
                ),
                filter: false
            }
        }
    ];
    const renderCategories = () => {
        if (isLoading) return <center><ReactLoading type='spokes' color="red"
            height={'1%'} width={'1%'} /></center>
        if (error) return <p>Impossible d'afficher la liste des categories...</p>
        return <React.Fragment>
            {categories &&
                <MUIDataTable
                    title="Liste des categories"
                    data={categories}
                    columns={columns}
                    options={{
                        rowsPerPage: 10,
                        rowsPerPageOptions: [5, 10, 20]
                    }}
                    ref={tableRef}
                />
            }
        </React.Fragment>
    }
    return (
        <>
            <div>
                <Insertcategorie />
            </div>
            <div>
                {renderCategories()}
            </div>
        </>
    )
}
export default AfficheCategories