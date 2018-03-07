import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import * as moment from 'moment';
import ExchangeRatesStore from '../../stores/exchange-rates.store';
import ExchangeRateView from '../../models/view-models/exchange-rate.view';
import ExchangeRateList from './components/ExchangeRateList';
import EditModal from './components/EditModal';
import './ExchangeRates.css';

interface HomeProps {
  exchangeRatesStore: ExchangeRatesStore;
}

export interface ExchangeRateEdit {
 date: moment.Moment;
 rate: number;
 targetCurrency: string;
}

@inject('exchangeRatesStore')
@observer
export default class Home extends React.Component<HomeProps> {
  @observable private isModalOpen = false;
  @observable private editedExchangeRate?: ExchangeRateView = undefined;

  constructor(props: HomeProps) {
    super(props);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
  }

  componentDidMount() {
    this.props.exchangeRatesStore.load();
  }

  render() {
    const { exchangeRates, isLoading, setSorting, isSortAscending, sortField } = this.props.exchangeRatesStore;
    return (
      <div className="exchange-rates">
        <ExchangeRateList
          exchangeRates={exchangeRates}
          isLoading={isLoading}
          isSortAscending={isSortAscending}
          sortField={sortField}
          onSort={setSorting.bind(this.props.exchangeRatesStore)}
          onEdit={this.openEditModal}
        />
        <EditModal
          exchangeRate={this.editedExchangeRate!}
          isOpen={this.isModalOpen}
          onClose={this.closeEditModal}
          onSubmit={this.updateExchangeRate}
        />
      </div>
    );
  }

  @action
  closeEditModal() {
    this.isModalOpen = false;
    this.editedExchangeRate = undefined;
  }

  @action
  openEditModal(exchangeRate: ExchangeRateView) {
    this.isModalOpen = true;
    this.editedExchangeRate = exchangeRate;
  }

  @action
  updateExchangeRate(edited: ExchangeRateEdit) {
    alert(JSON.stringify(edited));
  }
}
