import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './Header.css'

function PublicNav() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid className='navbar-container'>
                <Navbar.Brand>
                    Travel Log
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to={'/login'} className='nav-link'>Login</NavLink>
                    <NavLink to={'/register'} className='nav-link'>Register</NavLink>
                </Nav>
            </Container>

        </Navbar >

    )
}

export default PublicNav