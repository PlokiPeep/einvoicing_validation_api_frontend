import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import APIService from "../services/APIService.js";
import {  Link } from "react-router-dom";

function BasicNavbar() {
  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    checkAliveness();
    const interval = window.setInterval(() => {
      checkAliveness();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const checkAliveness = () => {
    APIService.checkAliveness().then((response) => {
      setIsAlive(response.data.is_alive);
    }).catch((err) => {
      setIsAlive(false);
    });
  }

  return (
    <Navbar style={{
      backgroundColor: 'lemonchiffon'
    }} expand="lg">
      <Container>
        <Navbar.Brand className="justify-content-start">🥨Churro's Validation Fixer for the win!🥨</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <a
          classname="App-link"
          href="https://cafedelites.com/wp-content/uploads/2020/05/Churros-Recipe-IMAGE-124.jpg"
          target="_blank"
          rel="noreference"
          >
            Become the churro!😋
          </a>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            
            <Navbar.Text>
              {isAlive ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <span className="text-success m-2">Server is up!</span>
                </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                    <span className="text-danger m-2">Server is down!</span>
                  </>
                )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicNavbar;