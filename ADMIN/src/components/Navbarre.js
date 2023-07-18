import React , {useState} from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
const Menu = () => {
    const title = process.env.REACT_APP_TITLE
    const user = localStorage.getItem('user');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const NomPrenom = searchParams.get('NomPrenom');
    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.setItem('user', false);
        navigate('/');
    }
  
    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <Navbar.Brand href="/">{title} Admin</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                {title} Admin
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                                    <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                                    <Nav.Link as={Link} to="/commande">Commandes</Nav.Link>
                                </Nav>
                                <Button onClick={handleLogout} variant="outline-success">Logout</Button>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}
export default Menu