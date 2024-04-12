import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Button, Paper, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/authAction";
import Typography from "@mui/material/Typography";
import Copyright from "../components/Copyright"


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const decodedToken = localStorage.getItem("mas_decodedToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login action
      dispatch(loginAction(username, password));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      navigate("/admin/categories"); // Redirect to /home if decodedToken exists
    }
  }, [decodedToken, navigate]);

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} style={{ padding: "35px" }}>
        <section
          style={{
            width: "100%",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "primary.main" }}
            style={{ width: 50, height: 50 }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connecter
          </Typography>
        </section>

        {!authState.loading ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom d'utilisateur"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              error={
                authState.message !== "Connexion réussie" &&
                authState.checkupErrorCredentials
              }
              helperText={
                authState.message !== "Connexion réussie" &&
                authState.checkupErrorCredentials &&
                "vérification Identification"
              }
              focused
            />

            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              error={
                authState.message !== "Connexion réussie" &&
                authState.checkupErrorCredentials
              }
              helperText={
                authState.message !== "Connexion réussie" &&
                authState.checkupErrorCredentials &&
                "vérification Identification"
              }
              focused
            />
            <div style={{ paddingTop: "10px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  se connecter
                </Button>
            </div>
          </form>
        ) : (
          <div
            style={{
              width: "355px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <Copyright sx={{ mt: 3 }} />
      </Paper>
    </Container>
  );
}

export default Login;
