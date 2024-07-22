import { CalculateResultType, ResultType } from '@/types';

/**
 * Time Complexity:
 *
 * Populating the map: O(n)
 * Nested loops to find pairs: O(n^2)
 * Lookup in the map: O(1)
 * Overall: O(n^2)
 *
 * Space complexity O(n^2)
 */
export const detectSums = (inputArray: number[]): ResultType => {
  if (!Array.isArray(inputArray)) {
    throw Error('Input is not an array');
  }

  const results: ResultType = [];
  const len = inputArray.length;
  const indexByValueMap = new Map();

  // Populate the indexMap with all elements' indices
  inputArray.forEach((num, index) => {
    if (!indexByValueMap.has(num)) {
      indexByValueMap.set(num, []);
    }
    indexByValueMap.get(num).push(index);
  });

  // To store unique results
  const seen = new Set();

  // Iterate over all pairs to find sums
  for (let pA = 0; pA < len; pA++) {
    for (let pB = pA + 1; pB < len; pB++) {
      const sumValue = inputArray[pA] + inputArray[pB];

      if (indexByValueMap.has(sumValue)) {
        for (const sumIndex of indexByValueMap.get(sumValue)) {
          if (sumIndex !== pA && sumIndex !== pB) {
            const key = `${pA},${pB},${sumIndex}`;
            if (!seen.has(key)) {
              results.push({ pA, pB, sum: sumIndex });
              seen.add(key);
            }
          }
        }
      }
    }
  }

  return results;
};

/**
 * Time Complexity: O(n^3)
 */
export const detectSumsMemoryEfficient = (array: number[]): ResultType => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }

  const results: ResultType = [];
  const len = array.length;

  for (let pA = 0; pA < len; pA++) {
    for (let pB = pA + 1; pB < len; pB++) {
      const sumValue = array[pA] + array[pB];

      for (let sum = 0; sum < len; sum++) {
        if (sum !== pA && sum !== pB && array[sum] === sumValue) {
          results.push({ pA, pB, sum });
        }
      }
    }
  }

  return results;
};

/**
 * Executes a function to detect sums based on the device type.
 * By default, uses the time-efficient implementation.
 * Optionally, a space-efficient implementation can be chosen based on the `isMobile` flag.
 */
export function calculateResult(
  input: string,
  isMobile = false,
): CalculateResultType {
  const parsedInput = input.split(',').map((i) => parseInt(i.trim(), 10));
  let error = null;
  let result: ResultType = [];

  try {
    result = isMobile
      ? detectSumsMemoryEfficient(parsedInput)
      : detectSums(parsedInput);
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = 'An unknown error occurred';
    }
  }

  return { input: parsedInput, result, error };
}
