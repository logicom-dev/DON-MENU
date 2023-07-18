
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
export default function Navbarre() {
  const title = process.env.REACT_APP_TITLE
  const navigate = useNavigate();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Articlesearch" >Articles</Nav.Link>
            <Nav.Link as={Link} to="/" >Catégories</Nav.Link>
          </Nav>
          <Button color="inherit"><Link to="/cart" style={{ "color": "#7e543b", "textDecoration": "none", borderRadius: '50%', fontSize: 26 }}>
            <ShoppingCartIcon sx={{ fontSize: 40 }} /></Link>
            <Badge badgeContent={cartTotalQuantity > 0 ? cartTotalQuantity : 0}
              color="success">
            </Badge>
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

