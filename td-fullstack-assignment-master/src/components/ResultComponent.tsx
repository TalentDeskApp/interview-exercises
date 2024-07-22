import React from 'react';
import { ResultItemType, ResultType } from '@/types';

// TODO add loading & empty state when the result is empty
// TODO scrolling & virtualization for more than 200 elements
const maxElements = 200;

export const ResultComponent = ({ result }: { result: ResultType }) => {
  const showResult = (item: ResultItemType) => {
    return `pA: ${item.pA}, pB: ${item.pB}, Sum: ${item.sum}`;
  };

  return (
    <div className="mt-8 w-full max-w-md pb-10">
      <ul className="space-y-2">
        {result.length > 0 &&
          result.slice(0, maxElements).map((item) => (
            <li
              key={`${item.pA}-${item.pB}`}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-700">{showResult(item)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
