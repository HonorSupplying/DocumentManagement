import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ThemeContext } from "./ThemeContext.js";

const NavbarComponent = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Navbar
      bg={isDarkMode ? "dark" : "light"}
      variant={isDarkMode ? "dark" : "light"}
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Document Manager
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/upload">
            Upload
          </Nav.Link>
          <Nav.Link as={Link} to="/search">
            Search
          </Nav.Link>
          <Nav.Link onClick={toggleTheme} style={{ cursor: "pointer" }}>
            {isDarkMode ? "🌝" : "🌚"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
