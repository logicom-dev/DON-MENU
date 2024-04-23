import React, { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../redux/actions/categoriesActions";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import AddCategoriesDialog from "../components/AddCategorieDialog";
import EditCategoriesDialog from "../components/EditCategorieDialog";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "../styles/articles-styles.scss";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = (CodeCat) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (shouldDelete) {
      dispatch(deleteCategory(CodeCat));
    }
  };

  const filteredCategories =
    categories &&
    categories.categories &&
    categories.categories.filter((categorie) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return categorie.DesCat.toLowerCase().includes(lowerCaseSearchTerm);
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categoriesToDisplay = filteredCategories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsDialogOpenEdit(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());

    const decodedToken = localStorage.getItem("mas_decodedToken");
    if (!decodedToken) {
      navigate("/admin");
    }
  }, [dispatch, navigate]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{ width: "100%", margin: "auto"}}
        component={Paper}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Recherche"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page when searching
            }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsDialogOpen(true)}
          >
            Ajouter
          </Button>
        </Paper>

        <TableContainer sx={{ height: "72vh" }}>
          {categories.loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    id
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    Code
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    Visible
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#7a7a77",
                      color: "#fff",
                      fontWeight: "bolder",
                      textAlign: "center"
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesToDisplay.map((categorie, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                    style={{textAlign: "center"}}
                  >
                    <TableCell style={{textAlign: "center"}}>{startIndex + index + 1}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{categorie.CodeCat}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{categorie.DesCat}</TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Sample Image"
                          height="140"
                          image={!categorie.Image ? require("../assets/large.jpg") : categorie.Image}
                        />
                      </Card>
                    </TableCell>
                    <TableCell >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={categorie.visible_web === 1 ? true : false}
                            color="primary"
                          />
                        }
                      />
                    </TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(categorie.CodeCat)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                      <IconButton aria-label="edit">
                        <EditIcon
                          sx={{ color: "blue" }}
                          onClick={() => handleEdit(categorie)} 
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

{/* Pagination Controls */}
<div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
  <IconButton
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    <NavigateBeforeIcon />
  </IconButton>
  {Array.from({ length: totalPages }, (_, index) => {
    if (index === 0 && currentPage > 3) {
      return (
        <Button key={index} onClick={() => handlePageChange(1)} variant="outlined">
          1
        </Button>
      );
    } else if (index > 1 && index < totalPages - 2 && currentPage > 3) {
      return (
        <Button key={index} variant="outlined">
          ...
        </Button>
      );
    } else if (Math.abs(currentPage - index - 1) <= 1) {
      return (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          variant={currentPage === index + 1 ? "contained" : "outlined"}
        >
          {index + 1}
        </Button>
      );
    } else if (index === totalPages - 1 && currentPage < totalPages - 2) {
      return (
        <Button key={index} variant="outlined">
          ...
        </Button>
      );
    }
    return null;
  })}
  <IconButton
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    <NavigateNextIcon />
  </IconButton>
</div>



        {/* Use the AddArticleDialog component */}
        <AddCategoriesDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={() => {
            setIsDialogOpen(false);
          }}
        />

        <EditCategoriesDialog
          open={isDialogOpenEdit}
          onClose={() => setIsDialogOpenEdit(false)}
          onAdd={() => { setIsDialogOpenEdit(false) }}
          initialCategory={selectedCategory} // Pass the selected category here
        />
      </TableContainer>
    </Paper>
  );
};

export default Categories;
