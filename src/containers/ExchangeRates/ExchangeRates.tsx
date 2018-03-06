import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ExchangeRatesStore from '../../stores/exchange-rates.store';
import ExchangeRateList from './components/ExchangeRateList';
import './ExchangeRates.css';

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
    const { exchangeRates, isLoading, setSorting, isSortAscending, sortField } = this.props.exchangeRatesStore;
    return (
      <div className="exchange-rates row">
        <div className="col-sm-12 col-md-8">
          <ExchangeRateList
            exchangeRates={exchangeRates}
            isLoading={isLoading}
            isSortAscending={isSortAscending}
            sortField={sortField}
            onSort={setSorting.bind(this.props.exchangeRatesStore)}
          />
        </div>
        <div className="col-sm-12 col-md-4">
          <button>Add rate</button>
        </div>
      </div>
    );
  }
}
