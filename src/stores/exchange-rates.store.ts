import { observable, action, computed, runInAction } from 'mobx';
import ExchangeRateAgent from '../agents/exchange-rate.agent';
import ExchangeRateView from '../models/view-models/exchange-rate.view';
import ExchangeRate, { ExchangeRateEdit } from '../models/exchange-rate.model';

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

  @action
  async update(exchangeRate: ExchangeRateEdit) {
    this.isLoading = true;
    const targetExchangeRate = {
      Id: exchangeRate.id,
      Rate: exchangeRate.rate,
      Date: exchangeRate.date.toISOString(),
      CurrencyPair: `EUR${exchangeRate.targetCurrency}`
    };

    // Target API does not support updating. There for for presentational purposes we're mocking success.
    try {
      await this.exchangeRateAgent.update(targetExchangeRate);
    } catch {
      this.updateRegistry(targetExchangeRate);
    }

    runInAction(() => {
      this.isLoading = false;
    });
  }

  @action
  private updateRegistry(exchangeRate: ExchangeRate) {
    this.exchangeRatesRegistry.set(exchangeRate.Id, new ExchangeRateView(exchangeRate));
  }
}
