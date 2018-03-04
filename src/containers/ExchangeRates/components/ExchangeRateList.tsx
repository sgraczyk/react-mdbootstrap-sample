import * as React from 'react';
import { LoadingSpinner } from '../../../components/layout';
import ExchangeRate from '../../../models/exchange-rate.model';
import ExchangeRecordRow from './ExchangeRecordRow';

interface ExchangeRateListProps {
  exchangeRates: ExchangeRate[];
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
      <div className="exchange-rate-preview">
        No Exchange rates available
      </div>
    );
  }

  return (
    <div>
      {
        exchangeRates.map((exchangeRate: ExchangeRate) => {
          return (
            <ExchangeRecordRow exchangeRate={exchangeRate} key={exchangeRate.Id} />
          );
        })
      }
    </div>
  );
};

export default ExchangeRateList;
