import React from 'react';
import { Form } from 'react-bootstrap';

type UnitType = 'laps' | 'reps' | 'meters' | 'miles' | 'kilometers' | 'time';

interface UnitSelectorProps {
  value: UnitType;
  onChange: (unit: UnitType) => void;
  allowedUnits?: UnitType[];
}

const allUnits: { label: string; value: UnitType }[] = [
  { label: 'Laps', value: 'laps' },
  { label: 'Reps', value: 'reps' },
  { label: 'Meters', value: 'meters' },
  { label: 'Miles', value: 'miles' },
  { label: 'Kilometers', value: 'kilometers' },
  { label: 'Time (min:sec)', value: 'time' },
];

const UnitSelector: React.FC<UnitSelectorProps> = ({ value, onChange, allowedUnits }) => {
  const unitsToShow = allowedUnits
    ? allUnits.filter((unit) => allowedUnits.includes(unit.value))
    : allUnits;

  return (
    <Form.Group controlId="unitSelector" className="mb-3">
      <Form.Label>Select Unit</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value as UnitType)}
      >
        {unitsToShow.map((unit) => (
          <option key={unit.value} value={unit.value}>
            {unit.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default UnitSelector;
