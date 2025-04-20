import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import Home from './pages/Home';
import Pyramid from './pages/Pyramid';
// import other workout pages here as needed

const App: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Athlete Math</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/pyramid">Pyramid</Nav.Link>
            {/* Add other workouts like Ladder, Descending, etc. here */}
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pyramid" element={<Pyramid />} />
          {/* Add more routes here as you build them */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
