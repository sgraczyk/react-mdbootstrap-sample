import * as React from 'react';
import { observer } from 'mobx-react';
import ExchangeRate from '../../../models/exchange-rate.model';

interface ExchangeRateRowProps {
  exchangeRate: ExchangeRate;
}

@observer
export default class ExchangeRateRow extends React.Component<ExchangeRateRowProps> {

  render() {
    const { exchangeRate } = this.props;

    return (
      <div className="exchange-rate-row">
        <div className="exchange-rate">
          <div className="exchange-rate-id">
            {exchangeRate.Id}
          </div>
          <div className="currency-pair">
            {exchangeRate.CurrencyPair}
            <span className="date">
              {new Date(exchangeRate.Date).toDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
