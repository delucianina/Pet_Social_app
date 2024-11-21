import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {client} from '../main';

import { useStore } from '../store';
import { LOGOUT_USER } from '../graphql/mutations';

function Header() {
  const { state, setState } = useStore()!;
  const [logoutUser] = useMutation(LOGOUT_USER);
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    await logoutUser();

    // ask copilot to explain this in detail later - why a callback function instead of spreading the state object? 
    setState((oldState) => ({
      // spread all old state objects 
      ...oldState,
      //replace user with null  
      user: null
    }));

    navigate('/');
  }

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container className="nav-wrap">
        <Navbar.Brand as={NavLink} to="/">Petstagram</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>


          {state.user ? (
            <>
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/pet">Add Pet</Nav.Link>
              <NavDropdown title="Profile Menu" id="basic-nav-dropdown" >
                <NavDropdown.ItemText className="border-bottom mb-2">Welcome, {state.user.username}</NavDropdown.ItemText>
                <NavDropdown.Item onClick={handleLogout} href="/logout">Log Out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
            </>
          )}

        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header;