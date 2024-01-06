
// ExchangeRatesTable.js
import React from 'react';
import './ExchangeRateTable.css';

const ExchangeRatesTable = ({ rates }) => {
  return (
    <div className="exchange-rates-table">
      <h2>Foreign Exchange Rates</h2>
      <table>
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.symbol}>
              <td>{getCurrencyPairLabel(rate.symbol)}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getCurrencyPairLabel = (symbol) => {
  const currencyPairs = {
    USDCAD: 'US Dollar to Canadian Dollar',
    GBPUSD: 'British Pound to US Dollar',
    USDJPY: 'US Dollar to Japanese Yen',
    // Add more currency pairs as needed
  };

  return currencyPairs[symbol] || symbol;
};

export default ExchangeRatesTable;
