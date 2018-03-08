import Agent from '.';
import ExchangeRate from '../models/exchange-rate.model';

export default class ExhangeRateAgent extends Agent {
  private path = '/exchangeRates';

  async all(): Promise<ExchangeRate[]> {
    return await this.get(this.path);
  }

  async find(id: string): Promise<ExchangeRate> {
    return await this.get(`${this.path}/${id}`);
  }

  async update(exchangeRate: ExchangeRate): Promise<void> {
    return await this.put(`${this.path}/${exchangeRate.Id}`, {
      CurrencyPair: exchangeRate.CurrencyPair,
      Date: exchangeRate.Date,
      Rate: exchangeRate.Rate
    });
  }
}
