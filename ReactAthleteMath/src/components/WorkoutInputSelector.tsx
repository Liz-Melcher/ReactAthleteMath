import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

interface WorkoutInputSelectorProps {
  onSubmit: (data: any) => void;
}

const WorkoutInputSelector: React.FC<WorkoutInputSelectorProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    calculateMode: 'goal',
    unit: 'laps',
    firstStep: '',
    increase: '',
    rest: '',
    topStep: '',
    numberOfSteps: '',
    goal: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4">
      <Form onSubmit={handleSubmit}>
        {/* Always visible */}
        <Form.Group className="mb-3">
          <Form.Label>Calculate From:</Form.Label>
          <Form.Select name="calculateMode" value={formData.calculateMode} onChange={handleChange}>
            <option value="goal">From Goal</option>
            <option value="bottom">From Bottom Step</option>
            <option value="top">From Top Step</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Units of Work:</Form.Label>
          <Form.Select name="unit" value={formData.unit} onChange={handleChange}>
            <option value="laps">Laps</option>
            <option value="reps">Reps</option>
            {/* Future: add distance, time */}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Step (Bottom Step):</Form.Label>
          <Form.Control name="firstStep" type="number" value={formData.firstStep} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Change Per Step:</Form.Label>
          <Form.Control name="increase" type="number" value={formData.increase} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rest Per Step (laps, reps, etc.):</Form.Label>
          <Form.Control name="rest" type="number" value={formData.rest} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Top Step:</Form.Label>
          <Form.Control name="topStep" type="number" value={formData.topStep} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Rounds:</Form.Label>
          <Form.Control name="numberOfSteps" type="number" value={formData.numberOfSteps} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Goal Total:</Form.Label>
          <Form.Control name="goal" type="number" value={formData.goal} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Build Workout
        </Button>
      </Form>
    </Card>
  );
};

export default WorkoutInputSelector;
