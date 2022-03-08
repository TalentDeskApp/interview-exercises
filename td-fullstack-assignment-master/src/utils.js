/**
 * Given an array of numbers, results in
 * sum of the numeric item from the array, each sum is unique
 * Input: an array of numbers, e.g. `A = [1, 2, 3]`
 * Output: an array of matches, as objects, containing keys `pA`, `pB`, `sum` such that `A[p1] + A[p2] === A[sum]`, e.g. `[{ pA: 0, pB: 1, sum: 2 }]]`
 * Time Complexity: O(NLog(N)) and Space Complexity: O(N)
 * @param {Array<int>} array 
 * @returns {Array<{pA: index, pB: index, sum: sumIndex}>}
 */
export const detectSums = (array) => {
  if(!(array instanceof Array)){
    throw new Error('Input is not an array');
  }
  if(array.length <=2){
    return [];
  }
  // If any value in the array is sum of some another pair
  const sums = new Map();
  let result = [];
  array.sort((a, b)=>{
    return a - b;
  });
  for (let i = 0; i < array.length; i++) {
    sums[array[i]] = i;
  }
  for(let a=0; a < array.length-1; a++){
    let pA = array[a];
    for(let b = a+1; b < array.length && a!==b; b++){
      let pB = array[b];
      if((typeof (sums[pA+pB]) !== 'undefined')){
        if(sums[pA+pB] !== a && sums[pA+pB] !== b){
          result.push({ pA: a, pB: b, sum: sums[pB+pA]});
        }
      }
    }
  } 
  return result;
};

/**
 * Given an array of numbers, results in
 * sum of the numeric item from the array, each sum is unique
 * Input: an array of numbers, e.g. `A = [1, 2, 3]`
 * Output: an array of matches, as objects, containing keys `pA`, `pB`, `sum` such that `A[p1] + A[p2] === A[sum]`, e.g. `[{ pA: 0, pB: 1, sum: 2 }]]`
 * Time Complexity: O(N^3) and Space Complexity: O(1)
 * @param {Array<int>} array 
 * @returns {Array<{pA: index, pB: index, sum: sumIndex}>}
 */
 export const detectSumsSpaceEfficient = (array) => {
  if(!(array instanceof Array)){
    throw new Error('Input is not an array');
  }
  if(array.length <=2){
    return [];
  }
  // If any value in the array is sum of some another pair
  let result = [];
  for(let i = 2; i < array.length; i++) {
    let target = array[i];
    for(let j = 0; j < array.length-1 && j!==i; j++) {
      for(let k = j+1; k < array.length-1 && k!==j; k++) {
        if(target === array[j] + array[k]){
          result.push({ pA: j, pB: k, sum: i });
        }
      }
    }
  }
  
  return result;
};

export function calculateResult(input) {
  /* const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10)); */
  let re = /\d+/g;
  let parsedInput = [];
  for (let regMatch of input.matchAll(re)) {
    parsedInput.push(parseInt(regMatch[0].trim(), 10));
 }
  let error = null;
  let result = [];
  if(parsedInput.length===0){
    error = "Atleast one element expected to be numeric."
  }else if(parsedInput.length<3){
    error = "Atleast 3 elements expected to be numeric for a succesfull sum pairs result."
  }
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error }
}
