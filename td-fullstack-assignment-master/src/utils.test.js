/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums, detectSumsSpaceEfficient } from './utils';

describe('Detect sums Time Efficient', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSums()).to.throw('Input is not an array');
  });

  it('should return empty if input is has a length of less than 3', () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });
  
  it('should return an array', () => {
    const result = detectSums([0,1,2]);
    expect(result).to.be.instanceof(Array);
  });

  it('should detect sums in order', () => {
    const result = detectSums([1, 2, 3,4]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2},{ pA: 0, pB: 2, sum: 3});
  });

  it('should detect sums in order many values', () => {
    const result = detectSums([1, 2, 3, 4, 5]);
    console.log("Should detect sums in order array:",[1, 2, 3, 4, 5]);
    console.log("Should detect sums in order result:",result);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(4);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2},{ pA: 0, pB: 2, sum: 3},{ pA: 1, pB: 2, sum: 4},{ pA: 0, pB: 3, sum: 4});
  });
});

describe('Detect sums Space/Memory efficient', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSumsSpaceEfficient()).to.throw('Input is not an array');
  });

  it('should return empty if input is has a length of less than 3', () => {
    const result = detectSumsSpaceEfficient([]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it('should return an array', () => {
    const result = detectSumsSpaceEfficient([0,1,2]);
    expect(result).to.be.instanceof(Array);
  });

  it('should detect sums in order', () => {
    const result = detectSumsSpaceEfficient([1, 2, 3]);
    console.log("Should detect sums in order array:",[1, 2, 3]);
    console.log("Should detect sums in order result:",result);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2});
  });
  it('should detect sums in order many values', () => {
    const result = detectSumsSpaceEfficient([1, 2, 3, 4, 5]);
    console.log("Should detect sums in order array:",[1, 2, 3, 4, 5]);
    console.log("Should detect sums in order result:",result);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(4);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2},{ pA: 0, pB: 2, sum: 3},{ pA: 1, pB: 2, sum: 4},{ pA: 0, pB: 3, sum: 4});
  });
});