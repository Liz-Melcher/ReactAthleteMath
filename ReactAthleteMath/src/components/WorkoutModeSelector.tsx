import React from 'react';
import { Form } from 'react-bootstrap';

type WorkoutMode = 'base' | 'top' | 'goal';

interface WorkoutModeSelectorProps {
  workoutMode: WorkoutMode;
  onChange: (mode: WorkoutMode) => void;
}

const WorkoutModeSelector: React.FC<WorkoutModeSelectorProps> = ({ workoutMode, onChange }) => {
  return (
    <Form.Group controlId="workoutModeSelector" className="mb-3">
      <Form.Label>Workout Calculation Mode</Form.Label>
      <Form.Select
        value={workoutMode}
        onChange={(e) => onChange(e.target.value as WorkoutMode)}
      >
        <option value="base">From Base Step (lowest step)</option>
        <option value="top">From Top Step (highest step)</option>
        <option value="goal">From Goal (target reps/distance)</option>
      </Form.Select>
    </Form.Group>
  );
};

export default WorkoutModeSelector;
