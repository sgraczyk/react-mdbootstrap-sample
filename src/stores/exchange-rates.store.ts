import { observable, action, computed, runInAction } from 'mobx';
import ExchangeRateAgent from '../agents/exchange-rate.agent';
import ExchangeRate from '../models/exchange-rate.model';

export class ExchangeRateView {
  @observable id: string;
  @observable currencyPair: string;
  @observable rate: number;
  @observable date: Date;

  @computed
  get targetCurrency() {
    return this.currencyPair.substr(3, 3);
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
    this.date = new Date(data.Date);
  }
}

export default class ExchangeRatesStore {
  @observable isLoading = false;
  @observable exchangeRatesRegistry = observable.map<ExchangeRateView>();

  private exchangeRateAgent: ExchangeRateAgent;

  constructor() {
    this.exchangeRateAgent = new ExchangeRateAgent();
  }

  @computed
  get exchangeRates() {
    return this.exchangeRatesRegistry.values();
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
}
