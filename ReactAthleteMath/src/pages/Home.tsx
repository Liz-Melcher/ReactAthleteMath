import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'; // adjust path if needed

const Home: React.FC = () => {
  const navigate = useNavigate();

  const workouts = [
    { title: 'Pyramid', route: '/pyramid', img: '/pyramid.png' },
    { title: 'Ladder', route: '/ladder', img: '/ladder.png' },
    { title: 'Descending Ladder', route: '/descending', img: '/descendingladder.png' },
    { title: 'Even Sets', route: '/even-sets', img: '/straightsets.png' }, //TODO: change straight sets graphic
  ];

  return (
    <>
      <NavBar />
      <Container className="my-4">
        <Row className="g-4">
          {workouts.map((workout) => (
            <Col key={workout.title} xs={12} sm={6} md={3}>
              <Card onClick={() => navigate(workout.route)} className="h-100 clickable-card">
                <Card.Img variant="top" src={workout.img} alt={workout.title} />
                <Card.Body>
                  <Card.Title className="text-center">{workout.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
