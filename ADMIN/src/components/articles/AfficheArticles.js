import React, { useRef } from 'react';
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux"
import { deleteArticle } from "../../features/articleSlice";
import Insertarticle from './Insertarticle';
import Editarticle from "./Editarticle";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
const AfficheArticles = () => {
    const dispatch = useDispatch();
    const { articles, isLoading, error } = useSelector((state) => state.storearticles);
    const tableRef = useRef(null);
    const handleDelete = (id) => {
        if (window.confirm("supprimer Article O/N")) {
            dispatch(deleteArticle(id));
        }
    }

    const columns = [
        {
            label: "LibArt",
            name: "LibArt"
        },
        {
            label: "CodeArt",
            name: "CodeArt"
        },
        {
            label: "Descrip",
            name: "Descrip"
        },
        {
            label: "Prix",
            name: "prix1"
        },
        {
            label: "CodeCat",
            name: "CodeCat"
        },
        {
            label: "image_web",
            name: "image_web",
            options: {
                customBodyRender: (image_web) => (
                    <img
                        src={`${image_web}`} width={100} height={100}
                        alt="" />
                )
            }
        },
        {
            name: "CodeArt",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <span>
                            <Editarticle art={articles[tableMeta.rowIndex]} />
                        </span>
                        <span
                            onClick={(e) => handleDelete(value)}
                            style={{ cursor: 'pointer' }}
                        >
                            <DeleteForeverRoundedIcon color='error' />
                        </span>
                    </div>
                )
            }
        }
    ];
    // error handling & map successful query data
    const renderArticles = () => {
        if (isLoading) return <center><ReactLoading type='spokes' color="red"
            height={'1%'} width={'1%'} /></center>
        if (error) return <p>Impossible d'afficher la liste des articles...</p>
        return <React.Fragment>
            {articles &&
                <MUIDataTable
                    title="Liste articles"
                    data={articles}
                    columns={columns}
                    options={{
                        rowsPerPage: 250,
                        rowsPerPageOptions: [220, 250]}}
                        ref={tableRef}
                />
            }
        </React.Fragment>
    }
    return (
        <>
            <div>
                <Insertarticle />
            </div>
            <div>
                {renderArticles()}
            </div>
        </>
    )
}
export default AfficheArticles