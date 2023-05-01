/**
Checks whether a value is a valid number. Returns true if the value is a valid number, and false otherwise.
A value is considered a valid number if it is a finite number or a string representation of a finite number.
@param value - The value to be checked.
@returns Returns true if the value is a valid number, and false otherwise.
**/

export const isValidNumber = (value: any): boolean => {
  if (value === "") {
    return false;
  } else if (typeof value === "number") {
    return !isNaN(value) && value !== Infinity && value !== -Infinity;
  } else if (typeof value === "string") {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue === Infinity || numValue === -Infinity) {
      return /^[-+]?[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/.test(value);
    } else {
      return true;
    }
  } else {
    return false;
  }
};
