import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom"

export default function Navbare() {
  return (
    <Navbar style={{backgroundColor: "#E0E0E0"}} expand="lg">
      <Container>
        <Navbar.Brand href="/">The Don</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Button color="inherit">
            <Nav.Link as={Link} to="/articles" >Articles</Nav.Link>
          </Button>
          <Button color="inherit">
            <Nav.Link as={Link} to="/" >Catégories</Nav.Link>
          </Button>
          </Nav>
          <Button color="inherit">
            <Link to="/commande" style={{ color: "#FFEE3C", textDecoration: "none", borderRadius: '50%', fontSize: 26 }}>
            <ShoppingCartIcon sx={{ fontSize: 40 }} /></Link>
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

