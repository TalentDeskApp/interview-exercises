import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import './index.css';
import './App.css';
import { calculateResult } from './utils/utils';
import { ResultComponent } from './components/ResultComponent';
import { useIsMobile } from './hooks/useIsMobile';
import { InputNumbersComponent } from './components/InputNumbersComponent';
import { FormValues, ResultType } from './types';

function App() {
  const [result, setResult] = useState<ResultType>([]);
  const isMobile = useIsMobile();

  const onSubmit: SubmitHandler<FormValues> = ({ numbers }) => {
    // TODO add throttling if necessary

    const { result } = calculateResult(numbers, isMobile);
    setResult(result);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Detect all sums form
      </h2>
      <p className="text-gray-800 text-center">
        Enter comma separated numbers and get all possible sums
      </p>
      <InputNumbersComponent onSubmit={onSubmit} />
      <ResultComponent result={result} />
    </div>
  );
}

export default App;
