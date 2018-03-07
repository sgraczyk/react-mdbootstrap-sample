import { observable, computed } from 'mobx';
import * as moment from 'moment';
import ExchangeRate from '../exchange-rate.model';

export default class ExchangeRateView {
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
