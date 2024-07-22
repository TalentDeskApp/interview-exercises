/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums } from '../utils';

describe('Detect time efficient sums', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSums()).to.throw('Input is not an array');
  });

  it.each([
    { input: [] },
    { input: [1, 2] },
    { input: [1, 2, 4] },
    { input: [3, 0, 2] },
    { input: [1, 1, 1, 1] },
    { input: [1] },
    { input: ['a', 'b', 'c'] },
  ])(
    'should return an array with 0 results for input $input',
    ({ input, expectedLength }) => {
      const result = detectSums(input);
      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(0);
    },
  );

  it.each([
    { input: [1, 2, 3], expectedResult: [{ pA: 0, pB: 1, sum: 2 }] },
    { input: [1.5, 2.5, 4.0], expectedResult: [{ pA: 0, pB: 1, sum: 2 }] },
    {
      input: [1000000, 500000, 1500000],
      expectedResult: [{ pA: 0, pB: 1, sum: 2 }],
    },
    {
      input: [-1, -2, -3, -5],
      expectedResult: [
        { pA: 0, pB: 1, sum: 2 },
        { pA: 1, pB: 2, sum: 3 },
      ],
    },
    {
      input: [1, 2, 3, 4],
      expectedResult: [
        { pA: 0, pB: 1, sum: 2 },
        { pA: 0, pB: 2, sum: 3 },
      ],
    },
    {
      input: [3, 0, 3],
      expectedResult: [
        { pA: 0, pB: 1, sum: 2 },
        { pA: 1, pB: 2, sum: 0 },
      ],
    },
    {
      input: [0, 0, 0],
      expectedResult: [
        { pA: 0, pB: 1, sum: 2 },
        { pA: 0, pB: 2, sum: 1 },
        { pA: 1, pB: 2, sum: 0 },
      ],
    },
    {
      input: [1, 2, 1, 3],
      expectedResult: [
        { pA: 0, pB: 1, sum: 3 },
        { pA: 0, pB: 2, sum: 1 },
        { pA: 1, pB: 2, sum: 3 },
      ],
    },
    {
      input: [1, 2, 3, 4, 5],
      expectedResult: [
        { pA: 0, pB: 1, sum: 2 },
        { pA: 0, pB: 2, sum: 3 },
        { pA: 0, pB: 3, sum: 4 },
        { pA: 1, pB: 2, sum: 4 },
      ],
    },
    {
      input: [1, 2, 1, 2, 3],
      expectedResult: [
        { pA: 0, pB: 1, sum: 4 },
        { pA: 0, pB: 2, sum: 1 },
        { pA: 0, pB: 2, sum: 3 },
        { pA: 0, pB: 3, sum: 4 },
        { pA: 1, pB: 2, sum: 4 },
        { pA: 2, pB: 3, sum: 4 },
      ],
    },
  ])(
    'should return an array with results $expectedResult.length for input $input',
    ({ input, expectedResult }) => {
      const result = detectSums(input);
      expect(result).to.be.instanceof(Array);
      expect(result).to.deep.equal(expectedResult);
    },
  );
});
