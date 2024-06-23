// components/CustomNavbar.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './CustomNavbar.module.css'; // Import CSS module
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

function CustomNavbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    window.location.href = '/Login'; // Or use router.push('/Login')
  };

  const handleNavItemClick = (path) => {
    router.push(path);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/">Raissi's coffeeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavItemClick('/products?category=hot Product')}>
                Hot Product
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavItemClick('/products?category=Cold Product')}>
                Cold Product
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleNavItemClick('/AddCategory')}>
                Add Category Product
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavItemClick('/AddProduct')}>
                Add Product
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">OrdersList</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/Register">Register</Nav.Link>
            <Nav.Link eventKey={2} onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
