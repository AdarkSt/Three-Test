import { CM_TO_METER, FEET_TO_CM, FEET_TO_METER, METER_TO_CM } from "../constants";

export class SizeCalculator {
  static feetToMeter = (feet: number): number => {
    return feet * FEET_TO_METER;
  };
  static cmToMeter = (cm: number): number => {
    return cm * CM_TO_METER
  };
  static feetToCm = (feet: number): number => {
    return feet * FEET_TO_CM
  }
  static meterToCm = (meter: number): number => {
    return meter * METER_TO_CM
  }
}
