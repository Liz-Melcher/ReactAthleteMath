import React, { useState } from 'react';
import WorkoutInputSelector from '../components/WorkoutInputSelector';
import { Card } from 'react-bootstrap';
import { convertToBaseUnits } from '../utils/unitConversion';
import { buildPyramidFromBaseStep } from '../utils/buildPyramidFromBaseStep';

const PyramidWorkout: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<any | null>(null);

  const handleFormSubmit = (formData: any) => {
    const { firstStep, increase, rest, topStep, unit } = formData;
    
    const firstStepBase = convertToBaseUnits(Number(firstStep), unit);
    const increaseBase = convertToBaseUnits(Number(increase), unit);
    const restBase = Number(rest); // Assuming rest is already in correct base (laps)
    const topStepBase = convertToBaseUnits(Number(topStep), unit);

    console.log('First Step in Base Units:', firstStepBase);
    console.log('Increase in Base Units:', increaseBase);

    // Build the pyramid using base values
    const pyramidSteps = buildPyramidFromBaseStep({
      firstStep: firstStepBase.valueInBaseUnits,
      increase: increaseBase.valueInBaseUnits,
      restPerStep: restBase, // assuming rest doesn't need conversion
      topStep: topStepBase.valueInBaseUnits,
    });

    console.log('Pyramid Steps:', pyramidSteps);
    setWorkoutData(pyramidSteps);
  };

  return (
    <div className="container p-4">
      <h1 className="mb-4 text-center">Pyramid Workout Builder</h1>

      <WorkoutInputSelector onSubmit={handleFormSubmit} />

      {workoutData && (
        <Card className="mt-4 p-3">
          <h2>Workout Preview</h2>
          <pre>{JSON.stringify(workoutData, null, 2)}</pre>
          {/* 🚧 Later: display the actual pyramid breakdown here */}
        </Card>
      )}
    </div>
  );
};

export default PyramidWorkout;
