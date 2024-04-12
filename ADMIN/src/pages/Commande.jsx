import React, { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCommande
} from "../redux/actions/commandeActions";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/articles-styles.scss";

import DetailCommandeDialog from "../components/DetailCommandeDialog"

const Commande = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commande = useSelector((state) => state.commande);

  const [isDialogOpenDetail, setIsDialogOpenDetail] = useState(false);
  const [commandeData, setCommandeData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/commande/${id}`, {
        method: "DELETE",
      });
      // Refresh the commande list after deletion
      dispatch(fetchCommande());
    } catch (error) {
      console.error("Error deleting commande:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const hendlerDetail = (commande) => {
    setIsDialogOpenDetail(true)
    setCommandeData(commande)
  }


  const filteredCommande =
     commande &&
     commande.commande && 
     commande.commande.filter((_commande) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return _commande && _commande.com_data && _commande.com_data.numch && _commande.com_data.numch.toLowerCase().includes(lowerCaseSearchTerm) ||
             _commande && _commande.com_data && _commande.com_data.numch && _commande.com_data.nom.toLowerCase().includes(lowerCaseSearchTerm)

    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const commandeToDisplay = filteredCommande.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCommande.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchCommande());

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
        </Paper>

        <TableContainer sx={{ height: "72vh" }}>
          {commande.loading ? (
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
                                    }}>ID</TableCell>
           
           <TableCell
                               style={{
                                backgroundColor: "#7a7a77",
                                color: "#fff",
                                fontWeight: "bolder",
                                textAlign: "center"
                              }}>Nom</TableCell>
           <TableCell
                               style={{
                                backgroundColor: "#7a7a77",
                                color: "#fff",
                                fontWeight: "bolder",
                                textAlign: "center"
                              }}>Numéro de table</TableCell>
           <TableCell
                               style={{
                                backgroundColor: "#7a7a77",
                                color: "#fff",
                                fontWeight: "bolder",
                                textAlign: "center"
                              }}>Remarque</TableCell>
           <TableCell
                               style={{
                                backgroundColor: "#7a7a77",
                                color: "#fff",
                                fontWeight: "bolder",
                                textAlign: "center"
                              }}>Total TTC</TableCell>
           <TableCell
                               style={{
                                backgroundColor: "#7a7a77",
                                color: "#fff",
                                fontWeight: "bolder",
                                textAlign: "center"
                              }}>Detail</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {commandeToDisplay.map((commande, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                    style={{textAlign: "center"}}
                  >
                    <TableCell style={{textAlign: "center"}}>{startIndex + index + 1}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{commande.com_data.nom}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{commande.com_data.numch}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{commande.com_data.note}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{commande.com_data.prixttc}</TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <IconButton aria-label="edit">
                        <OpenInNewIcon sx={{ color: '#1976D3' }} onClick={() => hendlerDetail(commande)}/>
                      </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon
                sx={{ color: "#FF0000" }}
                onClick={() => handleDelete(commande.id_cmd)}
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

       <DetailCommandeDialog 
          open={isDialogOpenDetail}
          onClose={() => setIsDialogOpenDetail(false)}
          commandeData={commandeData}
        />

      </TableContainer>
    </Paper>
  );
};

export default Commande;
