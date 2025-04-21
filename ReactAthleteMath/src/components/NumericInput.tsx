import React from 'react';
import { Form } from 'react-bootstrap';

interface NumericInputProps {
  label: string;
  controlId: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number; // New optional prop to control decimal precision
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  controlId,
  value,
  onChange,
  min = 0,
  step
}) => {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onWheel={(e) => e.currentTarget.blur()}
        autoComplete="off"
        min={min}
        step={step}
      />
    </Form.Group>
  );
};

export default NumericInput;
