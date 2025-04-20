import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface TimeInputProps {
  minutes: number;
  seconds: number;
  onChange: (newTime: { minutes: number; seconds: number }) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ minutes, seconds, onChange }) => {
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    onChange({ minutes: value, seconds });
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    onChange({ minutes, seconds: value });
  };

  return (
    <Form.Group controlId="timeInput" className="mb-3">
      <Form.Label>Enter Time</Form.Label>
      <Row>
        <Col xs={6}>
          <Form.Label>Minutes</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={minutes}
            onChange={handleMinutesChange}
          />
        </Col>
        <Col xs={6}>
          <Form.Label>Seconds</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={handleSecondsChange}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default TimeInput;
