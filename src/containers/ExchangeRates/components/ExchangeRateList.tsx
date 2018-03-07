import * as React from 'react';
import ExchangeRateHeader from './ExchangeRateHeader';
import ExchangeRateRow from './ExchangeRateRow';
import { LoadingSpinner } from '../../../components/layout';
import ExchangeRateView from '../../../models/view-models/exchange-rate.view';
import ExchangeRateSortField from '../../../constants/exchange-rate-sort-field';

interface ExchangeRateListProps {
  exchangeRates: ExchangeRateView[];
  isLoading: boolean;
  isSortAscending: boolean;
  sortField: ExchangeRateSortField;
  onSort: (sortField: ExchangeRateSortField) => void;
  onEdit: (exchangeRate: ExchangeRateView) => void;
}

const ExchangeRateList = ({
  exchangeRates, isLoading, isSortAscending, sortField,
  onSort, onEdit
}: ExchangeRateListProps) => {
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
        <ExchangeRateHeader
          sortField={sortField}
          onSort={onSort}
          isSortAscending={isSortAscending}
        />
      </thead>
      <tbody>
        {
          exchangeRates.map((exchangeRate: ExchangeRateView) => {
            return (
              <ExchangeRateRow
                exchangeRate={exchangeRate}
                key={exchangeRate.id}
                onEdit={onEdit}
              />
            );
          })
        }
      </tbody>
    </table>
  );
};

export default ExchangeRateList;
