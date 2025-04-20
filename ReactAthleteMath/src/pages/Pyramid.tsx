import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import WorkoutModeSelector from '../components/WorkoutModeSelector';
import GoalLogicSelector from '../components/GoalLogicSelector';
import PyramidWorkoutCalculator from '../components/PyramidWorkoutCalculator';
import WorkoutBaseFields from '../components/WorkoutBaseFields';
import { calculatePeakStepFromGoal } from '../components/CalculatePeakStepFromGoal';

type UnitType = 'laps' | 'reps' | 'meters' | 'miles' | 'kilometers' | 'time';
type WorkoutMode = 'base' | 'top' | 'goal';
type GoalDirection = 'gte' | 'lte';

const Pyramid: React.FC = () => {
  const [unit, setUnit] = useState<UnitType>('reps');
  const [restValue, setRestValue] = useState<number | undefined>(undefined);
  const [changePerStep, setChangePerStep] = useState<number | undefined>(undefined);
  const [lowestStep, setLowestStep] = useState<number | undefined>(undefined);
  const [highestStep, setHighestStep] = useState<number | undefined>(undefined);
  const [goal, setGoal] = useState<number | undefined>(undefined);
  const [workoutMode, setWorkoutMode] = useState<WorkoutMode>('top');
  const [goalDirection, setGoalDirection] = useState<GoalDirection>('gte');

  useEffect(() => {
    if (workoutMode === 'goal' && goal !== undefined && goal > 0 && changePerStep !== undefined && changePerStep > 0) {
      const peak = calculatePeakStepFromGoal(goal, changePerStep, goalDirection);
      setHighestStep(peak);
    }
  }, [goal, changePerStep, workoutMode]);

  const isReadyForCalculation =
    unit &&
    restValue !== undefined &&
    changePerStep !== undefined &&
    (
      (workoutMode === 'goal' && goal !== undefined && goal > 0) ||
      (workoutMode === 'top' && highestStep !== undefined && highestStep > 0) ||
      (workoutMode === 'base' &&
        lowestStep !== undefined &&
        highestStep !== undefined &&
        lowestStep > 0 &&
        highestStep > 0)
    );

  return (
    <Container className="py-4">
      <h2 className="mb-4">Pyramid Workout Builder</h2>

      <WorkoutModeSelector workoutMode={workoutMode} onChange={setWorkoutMode} />

      {workoutMode === 'goal' && (
        <>
          <GoalLogicSelector goalDirection={goalDirection} onChange={setGoalDirection} />
          <Form.Group controlId="goalInput" className="mb-3">
            <Form.Label>Goal</Form.Label>
            <Form.Control
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={goal ?? ''}
              onChange={(e) => setGoal(parseFloat(e.target.value) || undefined)}
              onWheel={(e) => e.currentTarget.blur()}
              autoComplete="off"
            />
          </Form.Group>
        </>
      )}

      <WorkoutBaseFields
        unit={unit}
        onUnitChange={setUnit}
        restValue={restValue ?? 0}
        onRestChange={setRestValue}
        changePerStep={changePerStep ?? 0}
        onChangePerStep={setChangePerStep}
        lowestStep={lowestStep ?? 0}
        onLowestStepChange={setLowestStep}
        highestStep={highestStep ?? 0}
        onHighestStepChange={setHighestStep}
        mode={workoutMode}
      />

      {isReadyForCalculation && highestStep !== undefined && changePerStep !== undefined && (
        <PyramidWorkoutCalculator
          peakStep={highestStep}
          increment={changePerStep}
          unit={unit}
        />
      )}
    </Container>
  );
};

export default Pyramid;
