import * as moment from 'moment';

export default interface ExchangeRate {
    Id: string;
    Rate: number;
    CurrencyPair: string;
    Date: string;
}

export interface ExchangeRateEdit {
    id: string;
    date: moment.Moment;
    rate: number;
    targetCurrency: string;
}
