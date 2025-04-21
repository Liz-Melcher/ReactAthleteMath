import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface PyramidWorkoutCalculatorProps {
  peakStep: number;      // n
  increment: number;     // s
  unit: string;          // just for display, e.g., 'reps', 'laps'
}

const PyramidWorkoutCalculator: React.FC<PyramidWorkoutCalculatorProps> = ({
  peakStep,
  increment,
  unit
}) => {
  if (increment <= 0 || peakStep <= 0) {
    return <p className="text-danger">Please enter a peak step and increment greater than 0.</p>;
  }

  // Ensure peak is divisible by increment for symmetry
  const isValid = peakStep % increment === 0;
  const warning = !isValid ? '⚠️ Peak step should be evenly divisible by the increment for a symmetrical pyramid.' : '';

  // Total steps formula: t = 2 * (n / s) - 1
  const totalSteps = 2 * (peakStep / increment) - 1;

  // Total work reps (no rest)
  let totalReps: number;
  if (increment === 1) {
    totalReps = Math.pow(peakStep, 2);
  } else if (increment === 2) {
    totalReps = Math.pow(peakStep, 2) / 2;
  } else {
    const stepsUp = peakStep / increment;
    totalReps = 2 * (stepsUp * (stepsUp + 1) / 2) * increment - peakStep;
  }

  // Build breakdown sequence
  const stepsUp = [];
  for (let i = increment; i <= peakStep; i += increment) {
    stepsUp.push(i);
  }
  const stepsDown = stepsUp.slice(0, -1).reverse();
  const fullSequence = [...stepsUp, ...stepsDown];

  const chartData = fullSequence.flatMap((value, index) => {
    const data = [
      {
        step: index * 2 + 1,
        value,
        type: 'work',
      },
    ];
    if (index < fullSequence.length - 1) {
      data.push({
        step: index * 2 + 2,
        value: increment,
        type: 'rest',
      });
    }
    return data;
  });

  const totalWithRest = totalReps + (fullSequence.length - 1) * increment;

  return (
    <Card className="my-3 p-3 shadow-sm">
      <Card.Title>Pyramid Workout Summary</Card.Title>
      <Card.Text><strong>Peak Step:</strong> {peakStep} {unit}</Card.Text>
      <Card.Text><strong>Increment:</strong> {increment} {unit} per step</Card.Text>
      <Card.Text><strong>Total Steps:</strong> {totalSteps}</Card.Text>
      <Card.Text><strong>Working {unit}:</strong> {totalReps.toFixed(unit === 'miles' ? 2 : unit === 'kilometers' ? 3 : 0)}</Card.Text>

      <Card.Text><strong>Total {unit} (including rest):</strong> {totalWithRest}</Card.Text>
      {warning && <Card.Text className="text-warning">{warning}</Card.Text>}

      <Card.Text className="mt-3"><strong>Breakdown:</strong></Card.Text>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {fullSequence.map((step, index) => (
          <Button key={index} variant="outline-primary" size="sm" disabled>
            {step} {unit}
          </Button>
        ))}
      </div>

      <Card.Text><strong>Visual Chart:</strong></Card.Text>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" label={{ value: 'Step', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: unit, angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value: number, _name: string, props) => [`${value} ${unit}`, props.payload.type === 'rest' ? 'Rest' : 'Work']} />
          <Legend />
          <Bar dataKey="value" fill="#0d6efd" name="Work" isAnimationActive={false} />
          <Bar dataKey="value" data={chartData.filter(d => d.type === 'rest')} fill="#6c757d" name="Rest" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PyramidWorkoutCalculator;