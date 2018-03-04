import { observable, action, computed, runInAction } from 'mobx';
import ExchangeRateAgent from '../agents/exchange-rate.agent';
import ExchangeRate from '../models/exchange-rate.model';

export default class ExchangeRatesStore {
  @observable isLoading = false;
  @observable exchangeRatesRegistry = observable.map<ExchangeRate>();

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
        this.exchangeRatesRegistry.set(exchangeRate.Id, exchangeRate));
    });

    runInAction(() => {
      this.isLoading = false;
    });
  }
}
