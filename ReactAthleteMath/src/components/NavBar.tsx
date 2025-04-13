import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Button variant="outline-primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
