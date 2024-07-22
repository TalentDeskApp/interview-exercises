import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InputNumbersComponent } from '../InputNumbersComponent';

describe('<InputNumbersComponent />', () => {
  it('Renders InputNumbersComponent', () => {
    const { asFragment } = render(<InputNumbersComponent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Form throws error if enter less than 3 numbers', async () => {
    const mockOnSubmit = jest.fn();

    render(<InputNumbersComponent onSubmit={mockOnSubmit} />);

    const inputField = screen.getByTestId('input-field');
    const submitButton = screen.getByTestId('submit-button');

    await act(async () => {
      fireEvent.change(inputField, { target: { value: '123' } });
      fireEvent.click(submitButton);
    });

    const errorField = await screen.findByTestId('error-field');
    expect(errorField.textContent).toEqual('Enter between 3 and 1000 numbers');
  });

  it('Form throws error if enter more than 1000 numbers', async () => {
    const mockOnSubmit = jest.fn();

    render(<InputNumbersComponent onSubmit={mockOnSubmit} />);

    const inputField = screen.getByTestId('input-field');
    const submitButton = screen.getByTestId('submit-button');

    const value = Array.from({ length: 1001 }, (_, index) => index + 1).join(
        ',',
    );

    await act(async () => {
      fireEvent.change(inputField, { target: { value } });
      fireEvent.click(submitButton);
    });

    const errorField = await screen.findByTestId('error-field');
    expect(errorField.textContent).toEqual('Enter between 3 and 1000 numbers');
  });

  it('Form throws error if input is empty', async () => {
    const mockOnSubmit = jest.fn();

    render(<InputNumbersComponent onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByTestId('submit-button');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorField = await screen.findByTestId('error-field');
    expect(errorField.textContent).toEqual('This field is required');
  });

  it('Form throws error if use wrong characters', async () => {
    const mockOnSubmit = jest.fn();

    render(<InputNumbersComponent onSubmit={mockOnSubmit} />);

    const inputField = screen.getByTestId('input-field');
    const submitButton = screen.getByTestId('submit-button');

    await act(async () => {
      fireEvent.change(inputField, { target: { value: '1.2.3' } });
      fireEvent.click(submitButton);
    });

    const errorField = await screen.findByTestId('error-field');
    expect(errorField.textContent).toEqual(
        'Enter valid numbers separated by commas',
    );
  });

  it('Successfully accept entered numbers', async () => {
    const mockOnSubmit = jest.fn();

    render(<InputNumbersComponent onSubmit={mockOnSubmit} />);

    const inputField = screen.getByTestId('input-field');
    const submitButton = screen.getByTestId('submit-button');
    const value = '1,2,3';

    await act(async () => {
      fireEvent.change(inputField, { target: { value } });
      fireEvent.click(submitButton);
    });

    const errorField = screen.queryByTestId('error-field');
    expect(errorField).toBeNull();

    const updatedInputField = screen.getByTestId('input-field');
    const inputValue = updatedInputField.value;
    expect(inputValue).toBe(value);
  });
});