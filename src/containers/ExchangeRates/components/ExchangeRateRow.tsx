import * as React from 'react';
import { Badge, Button, Fa } from 'mdbreact';
import ExchangeRateView from '../../../models/view-models/exchange-rate.view';

interface ExchangeRateRowProps {
  exchangeRate: ExchangeRateView;
  onEdit: (exchangeRate: ExchangeRateView) => void;
}

const ExchangeRateRow = ({ exchangeRate, onEdit }: ExchangeRateRowProps) => {
  return (
    <tr className="exchange-rate-row">
      <td className="date">
        {exchangeRate.date.format('DD/MM/YYYY')}
      </td>
      <td className="currency-pair">
        <Badge color="blue">
          <Fa icon={exchangeRate.targetCurrencyIconName} /> {exchangeRate.targetCurrency}
        </Badge>
      </td>
      <td className="exchange-rate">
        {exchangeRate.rate}
      </td>
      <td>
        <Button
          className="edit-button"
          tag="a"
          floating={true}
          gradient="blue"
          onClick={() => onEdit(exchangeRate)}
        >
          <Fa icon="edit" />
        </Button>
      </td>
    </tr>
  );
};

export default ExchangeRateRow;
