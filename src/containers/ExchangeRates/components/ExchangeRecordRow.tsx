import * as React from 'react';
import { observer } from 'mobx-react';
import { Badge } from 'mdbreact';
import { ExchangeRateView } from '../../../stores/exchange-rates.store';

interface ExchangeRateRowProps {
  exchangeRate: ExchangeRateView;
}

@observer
export default class ExchangeRateRow extends React.Component<ExchangeRateRowProps> {

  render() {
    const { exchangeRate } = this.props;

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
  }
}
