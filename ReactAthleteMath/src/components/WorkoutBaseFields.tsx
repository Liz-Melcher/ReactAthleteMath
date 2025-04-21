import React from 'react';
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

  numberOfSets?: number;
  onNumberOfSetsChange?: (val: number) => void;

  setsRequired?: boolean;

  lowestStep?: number;
  onLowestStepChange?: (val: number) => void;

  highestStep?: number;
  onHighestStepChange?: (val: number) => void;

  mode: WorkoutMode;
};

const getStepForUnit = (unit: UnitType): number => {
  switch (unit) {
    case 'miles': return 0.01;
    case 'kilometers': return 0.001;
    default: return 1;
  }
};

const WorkoutBaseFields: React.FC<WorkoutBaseFieldsProps> = ({
  unit,
  onUnitChange,
  restValue,
  onRestChange,
  changePerStep,
  onChangePerStep,
  numberOfSets,
  onNumberOfSetsChange,
  setsRequired,
  lowestStep,
  onLowestStepChange,
  highestStep,
  onHighestStepChange,
  mode
}) => {
  const step = getStepForUnit(unit);

  return (
    <>
      <UnitSelector value={unit} onChange={onUnitChange} allowedUnits={['laps', 'reps', 'meters', 'miles', 'kilometers', 'time']} />

      {mode === 'base' && onLowestStepChange !== undefined && lowestStep !== undefined && (
        <NumericInput
          label="Lowest Step"
          controlId="lowestStepInput"
          value={lowestStep}
          onChange={onLowestStepChange}
          min={1}
          step={step}
        />
      )}

      <NumericInput
        label="Rest per Step"
        controlId="restInput"
        value={restValue}
        onChange={onRestChange}
        step={step}
      />

      <NumericInput
        label="Change per Step"
        controlId="changeInput"
        value={changePerStep}
        onChange={onChangePerStep}
        min={1}
        step={step}
      />

      {mode !== 'goal' && onHighestStepChange !== undefined && highestStep !== undefined && (
        <NumericInput
          label="Highest Step"
          controlId="highestStepInput"
          value={highestStep}
          onChange={onHighestStepChange}
          min={1}
          step={step}
        />
      )}

      {setsRequired && onNumberOfSetsChange !== undefined && numberOfSets !== undefined && (
        <NumericInput
          label="Number of Sets"
          controlId="setsInput"
          value={numberOfSets}
          onChange={onNumberOfSetsChange}
          min={1}
          step={1}
        />
      )}
    </>
  );
};

export default WorkoutBaseFields;
