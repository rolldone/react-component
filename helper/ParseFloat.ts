import { toNumber } from "lodash";

export default function (input: any, fixed?: number | null) {
  try {
    if (fixed == null) {
      let _input = input as string;
      if (_input.startsWith('-') && _input.length == 1) {
        return input;
      }
      return parseFloat(toNumber(input).toFixed());
    }
    let result = parseFloat(toNumber(input).toFixed(fixed));
    return result;
  } catch (ex) {
    return toNumber(input);
  }
}