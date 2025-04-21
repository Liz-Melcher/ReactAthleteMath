export function calculatePeakStepFromGoal(
    goal: number,
    increment: number,
    direction: 'gte' | 'lte' = 'gte'
  ): number {
    if (increment <= 0 || goal <= 0) return 0;

let peakStep = increment;
let lastValidPeak = 0;

while (peakStep < 10000) {
  const stepsUp = peakStep / increment;
  const totalSteps = 2 * stepsUp - 1;

  let totalWork: number;
  if (increment === 1) {
    totalWork = Math.pow(peakStep, 2);
  } else if (increment === 2) {
    totalWork = Math.pow(peakStep, 2) / 2;
  } else {
    totalWork = 2 * (stepsUp * (stepsUp + 1) / 2) * increment - peakStep;
  }

  const totalRest = (totalSteps - 1) * increment;
  const totalEffort = totalWork + totalRest;

  if (direction === 'gte') {
    if (totalEffort >= goal) return peakStep;
  } else {
    if (totalEffort > goal) return lastValidPeak;
    lastValidPeak = peakStep;
  }

  peakStep += increment;
}

// Fallback return
return direction === 'lte'
  ? lastValidPeak > 0
    ? lastValidPeak
    : increment // fallback if no valid peak was found
  : peakStep;
  }
  