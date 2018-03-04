import Agent from '.';
import ExchangeRate from '../models/exchange-rate.model';

export default class ExhangeRateAgent extends Agent {

  async all(): Promise<ExchangeRate[]> {
    return await this.get('/exchangeRates');
  }
}
