import { observable, action, computed, runInAction } from 'mobx';
import ExchangeRateAgent from '../agents/exchange-rate.agent';
import ExchangeRateSortField from '../constants/exchange-rate-sort-field';
import ExchangeRateView from '../models/view-models/exchange-rate.view';

export default class ExchangeRatesStore {
  @observable isLoading = false;
  @observable sortField = ExchangeRateSortField.Date;
  @observable isSortAscending = true;
  @observable exchangeRatesRegistry = observable.map<ExchangeRateView>();

  private exchangeRateAgent: ExchangeRateAgent;

  constructor() {
    this.exchangeRateAgent = new ExchangeRateAgent();
  }

  @computed
  get exchangeRates() {
    return this.exchangeRatesRegistry
      .values()
      .sort(this.sortBy(this.sortField));
  }

  @action
  async load() {
    this.isLoading = true;
    const exchangeRates = await this.exchangeRateAgent.all();

    runInAction(() => {
      exchangeRates.forEach(exchangeRate =>
        this.exchangeRatesRegistry.set(exchangeRate.Id, new ExchangeRateView(exchangeRate)));
    });

    runInAction(() => {
      this.isLoading = false;
    });
  }

  @action
  setSorting(sortField: ExchangeRateSortField) {
    this.isSortAscending = sortField === this.sortField
      ? !this.isSortAscending
      : true;
    this.sortField = sortField;
  }

  sortBy = (sortField: ExchangeRateSortField) => (a: ExchangeRateView, b: ExchangeRateView) => {
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
