import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ExchangeRatesStore from '../../stores/exchange-rates.store';
import ExchangeRateList from './components/ExchangeRateList';

interface HomeProps {
  exchangeRatesStore: ExchangeRatesStore;
}

@inject('exchangeRatesStore')
@observer
export default class Home extends React.Component<HomeProps> {

  componentDidMount() {
    this.props.exchangeRatesStore.load();
  }

  render() {
    const { exchangeRates, isLoading } = this.props.exchangeRatesStore;
    return (
      <div className="exchange-components col-md-9" >
        <ExchangeRateList
          exchangeRates={exchangeRates}
          isLoading={isLoading}
        />
      </div >
    );
  }
}
