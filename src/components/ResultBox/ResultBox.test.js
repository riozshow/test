import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='USD' to='PLN' amount='0' />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: 34 },
      { from: 'PLN', to: 'USD', amount: 342 },
      { from: 'PLN', to: 'USD', amount: 123 },
    ];

    for (const test of testCases) {
      render(<ResultBox {...test} />);
      const resultBox = screen.getByTestId('result');

      const textContext = `${test.from} ${test.amount.toFixed(
        2
      )} = ${convertPLNToUSD(test.amount)}`;

      expect(resultBox).toHaveTextContent(textContext);

      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { from: 'USD', to: 'PLN', amount: 34 },
      { from: 'USD', to: 'PLN', amount: 342 },
      { from: 'USD', to: 'PLN', amount: 123 },
    ];

    for (const test of testCases) {
      render(<ResultBox {...test} />);
      const resultBox = screen.getByTestId('result');

      const textContext = `$${test.amount.toFixed(2)} = ${convertUSDToPLN(
        test.amount
      )}`;

      expect(resultBox).toHaveTextContent(textContext);

      cleanup();
    }
  });

  it('should render proper info about conversion when from and to are the same', () => {
    const testCases = [
      { from: 'USD', to: 'USD', amount: 34 },
      { from: 'USD', to: 'USD', amount: 342 },
      { from: 'USD', to: 'USD', amount: 123 },
      { from: 'PLN', to: 'PLN', amount: 34 },
      { from: 'PLN', to: 'PLN', amount: 342 },
      { from: 'PLN', to: 'PLN', amount: 123 },
    ];

    for (const test of testCases) {
      render(<ResultBox {...test} />);
      const resultBox = screen.getByTestId('result');

      const fromValue = test.from === 'USD' ? '$' : `${test.from} `;
      const toValue = test.to === 'USD' ? '$' : `${test.to} `;
      const textValue = test.amount.toFixed(2);

      const textContext = `${fromValue}${textValue} = ${toValue}${textValue}`;

      expect(resultBox).toHaveTextContent(textContext);

      cleanup();
    }
  });

  it('should render Wrong value... when from or to are negative', () => {
    const testCases = [
      { from: 'USD', to: 'PLN', amount: -34 },
      { from: 'USD', to: 'PLN', amount: -342 },
      { from: 'USD', to: 'PLN', amount: -123 },
      { from: 'PLN', to: 'USD', amount: -34 },
      { from: 'PLN', to: 'USD', amount: -342 },
      { from: 'PLN', to: 'USD', amount: -123 },
    ];

    for (const test of testCases) {
      render(<ResultBox {...test} />);
      const resultBox = screen.getByTestId('result');

      expect(resultBox).toHaveTextContent('Wrong value...');

      cleanup();
    }
  });
});
