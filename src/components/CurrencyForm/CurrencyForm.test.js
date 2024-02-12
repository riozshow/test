import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const action = jest.fn();

      render(<CurrencyForm action={action} />);

      const submitButton = screen.getByText('Convert');
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from');
      const toField = screen.getByTestId('to');

      const { amount, from, to } = testObj;

      userEvent.type(amountField, amount);
      userEvent.selectOptions(fromField, from);
      userEvent.selectOptions(toField, to);

      userEvent.click(submitButton);

      testObj.amount = parseInt(testObj.amount);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith(testObj);

      cleanup();
    }
  });
});
