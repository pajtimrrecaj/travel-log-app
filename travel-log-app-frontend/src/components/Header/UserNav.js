import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../lib/store/slices/authSlice'
import api, { endpoints } from '../../lib/api'
import { setSearchResults } from '../../lib/store/slices/searchSlice';



function UserNav() {

    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await api.call(endpoints.search, { query })
        setQuery('')
        dispatch(setSearchResults(response.results))
        navigate("/search-results")
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid className='navbar-container'>
                <Navbar.Brand>
                    Travel Log
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to={'/profile'} className='nav-link'>Profile</NavLink>
                    <NavLink to={'/login'} className='nav-link' onClick={() => {
                        dispatch(logout())
                    }}>Logout</NavLink>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" type='submit'>Search</Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default UserNav