import React from 'react';
import { Form } from 'react-bootstrap';

type GoalDirection = 'gte' | 'lte';

interface GoalLogicSelectorProps {
  goalDirection: GoalDirection;
  onChange: (value: GoalDirection) => void;
}

const GoalLogicSelector: React.FC<GoalLogicSelectorProps> = ({ goalDirection, onChange }) => {
  return (
    <Form.Group controlId="goalLogicSelector" className="mb-3">
      <Form.Label>Goal Logic</Form.Label>
      <Form.Select
        value={goalDirection}
        onChange={(e) => onChange(e.target.value as GoalDirection)}
      >
        <option value="lte">No more than (≤ goal)</option>
        <option value="gte">At least (≥ goal)</option>
      </Form.Select>
    </Form.Group>
  );
};

export default GoalLogicSelector;
