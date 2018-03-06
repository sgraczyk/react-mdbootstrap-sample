import * as React from 'react';
import { Badge } from 'mdbreact';
import { ExchangeRateView } from '../../../stores/exchange-rates.store';

interface ExchangeRateRowProps {
  exchangeRate: ExchangeRateView;
}

const ExchangeRateRow = ({ exchangeRate }: ExchangeRateRowProps) => {
  return (
    <tr className="exchange-rate-row">
      <td className="date">
        {exchangeRate.date.toDateString()}
      </td>
      <td className="currency-pair">
        <Badge color="blue">
          <i className={`fa fa-${exchangeRate.targetCurrencyIconName}`} /> {exchangeRate.targetCurrency}
        </Badge>
      </td>
      <td className="exchange-rate">
        {exchangeRate.rate}
      </td>
    </tr>
  );
};

export default ExchangeRateRow;
