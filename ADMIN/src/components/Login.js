import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useAuth } from './auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center"
      {...props}>
      {'Copyright © '}
      <Link color="inherit" href='https://21c-digital.com/'>
        21C'DIGITAL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();
export const Login = () => {
  const auth = useAuth();
  const [NomPrenom, setNomPrenom] = useState('');
  const [MotPasse, setMotPasse] = useState('');
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(process.env.REACT_APP_API + "/login", { NomPrenom, MotPasse })
      .then(data => {
        if (data.data.message === 'Login success') {
          auth.user = true
          navigate('/commande');
          localStorage.setItem('user', true);
        }
        else {
          if (data.data.status === 500) {
            alert('Utilisateur inexistant')
          }
          else {
            alert('Mot de passe incorrect')
          }
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <TextField
              onChange={(e) => setNomPrenom(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="NomPrenom"
              label="Nom et Prénom"
              name="NomPrenom"
              autoComplete="NomPrenom"
              autoFocus
            />
            <TextField
              onChange={(e) => setMotPasse(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="MotPasse"
              label="Mot de Passe"
              type="password"
              id="MotPasse"
              autoComplete="current-password"
            />
            <Button
              onClick={handleLogin}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
