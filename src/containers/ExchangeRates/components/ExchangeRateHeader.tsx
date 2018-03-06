import * as React from 'react';
import SortIcon from './SortIcon';
import ExchangeRateSortField from '../../../constants/exchange-rate-sort-field';

interface ExchangeRateHeaderProps {
  sortField: ExchangeRateSortField;
  isSortAscending: boolean;
  onSort: (sortField: ExchangeRateSortField) => void;
}

const ExchangeRateHeader = ({ sortField, isSortAscending, onSort }: ExchangeRateHeaderProps) => {
  return (
    <tr>
      <th onClick={() => onSort(ExchangeRateSortField.Date)}>
        Date {sortField === ExchangeRateSortField.Date
          && <SortIcon isAscending={isSortAscending} />}
      </th>
      <th onClick={() => onSort(ExchangeRateSortField.TargetCurrency)}>
        Target Currency {sortField === ExchangeRateSortField.TargetCurrency
          && <SortIcon isAscending={isSortAscending} />}
      </th>
      <th onClick={() => onSort(ExchangeRateSortField.Rate)}>
        Rate {sortField === ExchangeRateSortField.Rate
          && <SortIcon isAscending={isSortAscending} />}
      </th>
      <th>
        Actions
      </th>
    </tr>
  );
};

export default ExchangeRateHeader;
