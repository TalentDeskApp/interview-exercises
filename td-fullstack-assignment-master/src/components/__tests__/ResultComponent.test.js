import React from 'react';
import { render } from '@testing-library/react';
import { ResultComponent } from '../ResultComponent';

describe('<ResultComponent />', () => {
  it('Renders ResultComponent', () => {
    const result = [
      { pA: 0, pB: 1, sum: 2 },
      { pA: 1, pB: 2, sum: 3 },
    ];
    const { asFragment } = render(<ResultComponent result={result} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
