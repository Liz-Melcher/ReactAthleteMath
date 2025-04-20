import React from 'react';
//import { Form } from 'react-bootstrap';
import UnitSelector from './UnitSelector';
import NumericInput from './NumericInput';

type UnitType = 'laps' | 'reps' | 'meters' | 'miles' | 'kilometers' | 'time';
type WorkoutMode = 'base' | 'top' | 'goal';

type WorkoutBaseFieldsProps = {
  unit: UnitType;
  onUnitChange: (unit: UnitType) => void;

  restValue: number;
  onRestChange: (val: number) => void;

  changePerStep: number;
  onChangePerStep: (val: number) => void;

  lowestStep?: number;
  onLowestStepChange?: (val: number) => void;

  highestStep?: number;
  onHighestStepChange?: (val: number) => void;

  mode: WorkoutMode;
};

const WorkoutBaseFields: React.FC<WorkoutBaseFieldsProps> = ({
  unit,
  onUnitChange,
  restValue,
  onRestChange,
  changePerStep,
  onChangePerStep,
  lowestStep,
  onLowestStepChange,
  highestStep,
  onHighestStepChange,
  mode
}) => {
  return (
    <>
      {/* Workout Calculation Mode is handled outside this component */}

      <UnitSelector value={unit} onChange={onUnitChange} allowedUnits={['laps', 'reps', 'meters', 'miles', 'kilometers', 'time']} />

      {mode === 'base' && onLowestStepChange !== undefined && lowestStep !== undefined && (
        <NumericInput
          label="Lowest Step"
          controlId="lowestStepInput"
          value={lowestStep}
          onChange={onLowestStepChange}
          min={1}
        />
      )}

      <NumericInput
        label="Rest per Step"
        controlId="restInput"
        value={restValue}
        onChange={onRestChange}
      />

      <NumericInput
        label="Change per Step"
        controlId="changeInput"
        value={changePerStep}
        onChange={onChangePerStep}
        min={1}
      />

      {mode !== 'goal' && onHighestStepChange !== undefined && highestStep !== undefined && (
        <NumericInput
          label="Highest Step"
          controlId="highestStepInput"
          value={highestStep}
          onChange={onHighestStepChange}
          min={1}
        />
      )}
    </>
  );
};

export default WorkoutBaseFields;
