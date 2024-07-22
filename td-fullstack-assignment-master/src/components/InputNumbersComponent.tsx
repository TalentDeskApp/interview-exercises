import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '@/types';

const minNumbers = 3;
const maxNumbers = 1000;

const validationRules = {
  required: 'This field is required',
  validate: {
    isNumberFormat: (value: string) => {
      const numberPattern = /^(\d+)(,\d+)*$/;
      return (
        numberPattern.test(value) || 'Enter valid numbers separated by commas'
      );
    },
    hasValidNumberCount: (value: string) => {
      const values = value.split(',').filter(Boolean);
      const numberCount = values.length;
      return numberCount >= minNumbers && numberCount <= maxNumbers
        ? true
        : `Enter between ${minNumbers} and ${maxNumbers} numbers`;
    },
  },
};

// TODO to improve UX add loading state, and clear button
export const InputNumbersComponent = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<FormValues>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className="mt-8 w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4 flex items-center space-x-2">
          <input
            {...register('numbers', validationRules)}
            id="inputField"
            data-testid="input-field"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter numbers, e.g. 1,2,3"
          />
          <button
            className="top-2 right-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="submit-button"
          >
            Enter
          </button>
        </div>

        <div className="h-3">
          {errors.numbers && (
            <p className="mt-2 text-red-500 text-sm" data-testid="error-field">
              {errors.numbers.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
