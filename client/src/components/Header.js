import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default function Header() {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand ><strong>not-loggedIn</strong></Navbar.Brand>
        <Nav className="me-auto">
         
          <Nav.Link as={Link} to="/signup" >Signup</Nav.Link>
          <Nav.Link  as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <br />
 
  </>
  )
}
