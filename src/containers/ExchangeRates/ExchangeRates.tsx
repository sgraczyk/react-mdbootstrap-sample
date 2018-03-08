import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import ExchangeRatesStore from '../../stores/exchange-rates.store';
import { ExchangeRateEdit } from '../../models/exchange-rate.model';
import ExchangeRateView from '../../models/view-models/exchange-rate.view';
import ExchangeRateSortField from '../../constants/exchange-rate-sort-field';
import ExchangeRateList from './components/ExchangeRateList';
import EditModal from './components/EditModal';
import './ExchangeRates.css';

interface HomeProps {
  exchangeRatesStore: ExchangeRatesStore;
}

@inject('exchangeRatesStore')
@observer
export default class Home extends React.Component<HomeProps> {
  @observable private isModalOpen = false;
  @observable private sortField = ExchangeRateSortField.Date;
  @observable private isSortAscending = true;
  @observable private exchangeRateToEdit?: ExchangeRateView = undefined;

  @computed
  get editedExchangeRate(): ExchangeRateEdit | undefined {
    if (this.exchangeRateToEdit) {
      return {
        id: this.exchangeRateToEdit!.id,
        rate: this.exchangeRateToEdit!.rate,
        date: this.exchangeRateToEdit!.date,
        targetCurrency: this.exchangeRateToEdit!.targetCurrency
      };
    }
    return undefined;
  }

  @computed
  get sortedExchangRates() {
    return this.props.exchangeRatesStore.exchangeRates
      .sort(this.sortBy(this.sortField));
  }

  constructor(props: HomeProps) {
    super(props);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.updateExchangeRate = this.updateExchangeRate.bind(this);
    this.setSorting = this.setSorting.bind(this);
  }

  componentDidMount() {
    this.props.exchangeRatesStore.load();
  }

  render() {
    const { isLoading } = this.props.exchangeRatesStore;
    return (
      <div className="exchange-rates">
        <ExchangeRateList
          exchangeRates={this.sortedExchangRates}
          isLoading={isLoading}
          isSortAscending={this.isSortAscending}
          sortField={this.sortField}
          onSort={this.setSorting}
          onEdit={this.openEditModal}
        />
        <EditModal
          exchangeRate={this.editedExchangeRate}
          isOpen={this.isModalOpen}
          onClose={this.closeEditModal}
          onSubmit={this.updateExchangeRate}
        />
      </div>
    );
  }

  @action
  protected closeEditModal() {
    this.isModalOpen = false;
    this.exchangeRateToEdit = undefined;
  }

  @action
  protected openEditModal(exchangeRate: ExchangeRateView) {
    this.isModalOpen = true;
    this.exchangeRateToEdit = exchangeRate;
  }

  @action
  protected updateExchangeRate(edited: ExchangeRateEdit) {
    this.closeEditModal();
    this.props.exchangeRatesStore.update(edited);
  }

  @action
  private setSorting(sortField: ExchangeRateSortField) {
    this.isSortAscending = sortField === this.sortField
      ? !this.isSortAscending
      : true;
    this.sortField = sortField;
  }

  private sortBy = (sortField: ExchangeRateSortField) => (a: ExchangeRateView, b: ExchangeRateView) => {
    let firstElement, secondElement;
    if (this.isSortAscending) {
      firstElement = a;
      secondElement = b;
    } else {
      firstElement = b;
      secondElement = a;
    }
    switch (sortField) {
      case ExchangeRateSortField.TargetCurrency:
        return firstElement.targetCurrency.localeCompare(secondElement.targetCurrency);
      case ExchangeRateSortField.Rate:
        return firstElement.rate - secondElement.rate;
      case ExchangeRateSortField.Date:
      default:
        return firstElement.date.diff(secondElement.date);
    }
  }
}
