import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddArticleDialog from "../components/AddArticleDialog";
import EditArticleDialog from "../components/EditArticleDialog";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit'
import CircularProgress from "@mui/material/CircularProgress";
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
import { deleteArticle , fetchArticles } from "../redux/actions/articlesActions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Articles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handleDelete = (CodeArt) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this Article?"
    );

    if (shouldDelete) {
      dispatch(deleteArticle(CodeArt));
    }
  };

  const filteredArticles =
    articles &&
    articles.articles &&
    articles.articles.filter((article) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        article.Descrip.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const articlesToDisplay = filteredArticles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsDialogOpenEdit(true);
  };

  useEffect(() => {
    dispatch(fetchArticles());

    const decodedToken = localStorage.getItem("mas_decodedToken");
    if (!decodedToken) {
      navigate("/admin");
    }
  }, [dispatch, navigate]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>

      <TableContainer
        sx={{ width: "100%", margin: "auto" }}
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
          <Button variant="contained" color="success" onClick={() => setIsDialogOpen(true)}>
            Ajouter
          </Button>
        </Paper>
        <TableContainer sx={{ height: "67vh" }}>
          {articles.loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "67vh",
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
                  Désignation
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#7a7a77",
                    color: "#fff",
                    fontWeight: "bolder",
                    textAlign: "center"
                  }}
                >
                  CodeCat
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
                  Prix
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
                {articlesToDisplay.map((article, index) => (
                  <TableRow
                    key={article.id}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                    style={{textAlign: "center"}}
                  >
                    <TableCell style={{textAlign: "center"}}>{startIndex + index + 1}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{article.CodeArt}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{article.Descrip}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{article.LibArt}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{article.CodeCat}</TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <Card>
                        <CardMedia
                          component="img"
                          alt="Sample Image"
                          height="140"
                          image={!article.image_web ? require("../assets/large.jpg") : article.image_web}
                        />
                      </Card>
                    </TableCell>
                    <TableCell style={{textAlign: "center"}}>{article.prix1}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={article.visible_web === 1 ? true : false}
                            color="primary"
                          />
                        }
                      />
                    </TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: 'red' }} onClick={() => handleDelete(article.CodeArt)}/>
                      </IconButton>
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: 'blue' }} onClick={() => handleEdit(article)}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

{/* Pagination Controls */}
<div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <IconButton
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    <NavigateBeforeIcon />
  </IconButton>
  {currentPage > 2 && (
    <>
      <Button onClick={() => handlePageChange(1)} variant="outlined">
        1
      </Button>
      {currentPage > 3 && <Button variant="outlined">...</Button>}
    </>
  )}
  {currentPage > 1 && (
    <Button onClick={() => handlePageChange(currentPage - 1)} variant="outlined">
      {currentPage - 1}
    </Button>
  )}
  <Button onClick={() => handlePageChange(currentPage)} variant="contained">
    {currentPage}
  </Button>
  {currentPage < totalPages && (
    <Button onClick={() => handlePageChange(currentPage + 1)} variant="outlined">
      {currentPage + 1}
    </Button>
  )}
  {currentPage < totalPages - 1 && (
    <>
      {currentPage < totalPages - 2 && <Button variant="outlined">...</Button>}
      <Button onClick={() => handlePageChange(totalPages)} variant="outlined">
        {totalPages}
      </Button>
    </>
  )}
  <IconButton
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    <NavigateNextIcon />
  </IconButton>
</div>





        {/* Use the AddArticleDialog component */}
        <AddArticleDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={() => {setIsDialogOpen(false)}}
        />

        <EditArticleDialog
          open={isDialogOpenEdit}
          onClose={() => setIsDialogOpenEdit(false)}
          onAdd={() => {setIsDialogOpenEdit(false)}}
          initialArticle={selectedArticle}
        />

      </TableContainer>
    </Paper>
  );
};

export default Articles;
