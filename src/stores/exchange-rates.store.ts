import { observable, action, computed, runInAction } from 'mobx';
import * as moment from 'moment';
import ExchangeRateAgent from '../agents/exchange-rate.agent';
import ExchangeRate from '../models/exchange-rate.model';
import ExchangeRateSortField from '../constants/exchange-rate-sort-field';

export class ExchangeRateView {
  @observable id: string;
  @observable currencyPair: string;
  @observable rate: number;
  @observable date: moment.Moment;

  @computed
  get targetCurrency() {
    if (this.currencyPair && this.currencyPair.length === 6) {
      return this.currencyPair.substr(3, 3);
    }
    return '';
  }
  set targetCurrency(value: string) {
    this.currencyPair = `EUR${value}`;
  }

  @computed
  get targetCurrencyIconName() {
    switch (this.targetCurrency) {
      case 'EUR':
        return 'eur';
      case 'USD':
        return 'dollar';
      case 'CHF':
      default:
        return 'money';
    }
  }

  constructor(data: ExchangeRate) {
    this.id = data.Id;
    this.currencyPair = data.CurrencyPair;
    this.rate = data.Rate;
    this.date = moment(data.Date);
  }
}

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
