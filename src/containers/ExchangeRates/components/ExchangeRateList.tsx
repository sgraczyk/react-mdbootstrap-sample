import * as React from 'react';
import { LoadingSpinner } from '../../../components/layout';
import { ExchangeRateView } from '../../../stores/exchange-rates.store';
import ExchangeRecordRow from './ExchangeRecordRow';

interface ExchangeRateListProps {
  exchangeRates: ExchangeRateView[];
  isLoading: boolean;
}

const ExchangeRateList = ({ exchangeRates, isLoading }: ExchangeRateListProps) => {
  if (isLoading && exchangeRates.length === 0) {
    return (
      <LoadingSpinner />
    );
  }

  if (exchangeRates.length === 0) {
    return (
      <div className="exchange-rates-no-results">
        No Exchange rates available
      </div>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Currency Pair</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
      {
        exchangeRates.map((exchangeRate: ExchangeRateView) => {
          return (
            <ExchangeRecordRow exchangeRate={exchangeRate} key={exchangeRate.id} />
          );
        })
      }
      </tbody>
    </table>
  );
};

export default ExchangeRateList;
