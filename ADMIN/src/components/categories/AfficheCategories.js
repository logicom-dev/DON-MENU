import React, { useRef } from 'react';
import MUIDataTable from "mui-datatables";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import {deleteCategorie} from "../../features/categorieSlice";
import Insertcategorie from "./Insertcategorie";
import Editcategorie from "./Editcategorie";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
const AfficheCategories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.storecategories);
    const tableRef = useRef(null);
    const handleDelete = (id) => {
        if (window.confirm("supprimer Categorie O/N")) {
            dispatch(deleteCategorie(id));
        }
    }
    const columns = [
      {
          label: "CodeCat",
          name: "CodeCat"
      },
      {
          label: "DesCat",
          name: "DesCat"
      },
      {
          label: "Image",
          name: "Image",
          options: {
              customBodyRender: (Image) => (
                  <img
                      src={`${Image}`} width={170} height={120}
                      alt="" />
              )
          }
      },
      {
          name: "CodeCat",
          label: "Actions",
          options: {
              customBodyRender: (value, tableMeta) => (
                  <div>
                      <span>
                          <Editcategorie cat={categories[tableMeta.rowIndex]} />
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
  const renderCategories = () => {
    if (isLoading) return <center><ReactLoading type='spokes' color="red"
        height={'1%'} width={'1%'} /></center>
    if (error) return <p>Impossible d'afficher la liste des categories...</p>
    return <React.Fragment>
        {categories &&
            <MUIDataTable
                title="Liste categories"
                data={categories}
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
          <Insertcategorie/>
      </div>
      <div>
          {renderCategories()}
      </div>
  </>
)
}
export default AfficheCategories