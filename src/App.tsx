import React from "react";
import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Memberships from "./pages/memberships";

// import "./App.css";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Lista de Membresías</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              flash ejemplo: <a href="#login">Bum!</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Memberships />
    </div>
  );
}

export default App;
