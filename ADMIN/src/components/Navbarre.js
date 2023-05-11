import React from 'react'
import { Nav, Navbar, Container, Form } from 'react-bootstrap';
//FormControl,Button
import { Link } from 'react-router-dom'
const Menu = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Catégories</Nav.Link>
                    <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Menu