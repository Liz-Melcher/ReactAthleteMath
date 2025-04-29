// src/utils/unitConversion.ts

export type UnitType = 'quantity' | 'distance' | 'time';

interface ConversionResult {
  valueInBaseUnits: number;
  unitType: UnitType;
}

/**
 * Converts user-entered values into base units:
 * - Quantity: stays the same (laps, reps)
 * - Distance: converts to meters
 * - Time: converts to seconds
 */
export function convertToBaseUnits(value: number, unit: string): ConversionResult {
  switch (unit) {
    case 'laps':
    case 'reps':
      return { valueInBaseUnits: value, unitType: 'quantity' };
    
    case 'miles':
      return { valueInBaseUnits: value * 1609.34, unitType: 'distance' };
    
    case 'kilometers':
      return { valueInBaseUnits: value * 1000, unitType: 'distance' };
    
    case 'meters':
      return { valueInBaseUnits: value, unitType: 'distance' };

    case 'minutes':
      return { valueInBaseUnits: value * 60, unitType: 'time' };

    case 'seconds':
      return { valueInBaseUnits: value, unitType: 'time' };

    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}
