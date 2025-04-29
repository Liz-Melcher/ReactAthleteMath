// src/utils/pyramid/buildPyramidFromBaseStep.ts

interface PyramidStep {
    stepNumber: number;
    work: number;
    rest: number;
    subtotal: number;
    runningTotal: number;
  }
  
  interface BuildPyramidFromBaseStepOptions {
    firstStep: number;
    increase: number;
    restPerStep: number;
    topStep: number;
  }
  
  export function buildPyramidFromBaseStep({
    firstStep,
    increase,
    restPerStep,
    topStep,
  }: BuildPyramidFromBaseStepOptions): PyramidStep[] {
    const steps: PyramidStep[] = [];
    let runningTotal = 0;
  
    // Build up from bottom to top
    const upSteps: number[] = [];
    for (let work = firstStep; work <= topStep; work += increase) {
      upSteps.push(work);
    }
  
    // Build down from (top - increase) back to bottom
    const downSteps: number[] = [];
    for (let work = topStep - increase; work >= firstStep; work -= increase) {
      downSteps.push(work);
    }
  
    const fullWorkout = [...upSteps, ...downSteps];
  
    fullWorkout.forEach((work, index) => {
      const subtotal = work + restPerStep;
      runningTotal += subtotal;
      steps.push({
        stepNumber: index + 1,
        work,
        rest: restPerStep,
        subtotal,
        runningTotal,
      });
    });
  
    return steps;
  }
  