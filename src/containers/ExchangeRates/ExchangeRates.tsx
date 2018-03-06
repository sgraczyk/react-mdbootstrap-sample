import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ExchangeRatesStore, { ExchangeRateView } from '../../stores/exchange-rates.store';
import ExchangeRateList from './components/ExchangeRateList';
import EditModal from './components/EditModal';
import './ExchangeRates.css';

interface HomeProps {
  exchangeRatesStore: ExchangeRatesStore;
}

interface HomeState {
  editedExchangeRate?: ExchangeRateView;
  isModalOpen: boolean;
}

@inject('exchangeRatesStore')
@observer
export default class Home extends React.Component<HomeProps, HomeState> {
  state = {
    isModalOpen: false,
    editedExchangeRate: undefined
  };

  constructor(props: HomeProps) {
    super(props);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
  }

  componentDidMount() {
    this.props.exchangeRatesStore.load();
  }

  render() {
    const { exchangeRates, isLoading, setSorting, isSortAscending, sortField } = this.props.exchangeRatesStore;
    const { isModalOpen, editedExchangeRate } = this.state;
    return (
      <div className="exchange-rates">
        <ExchangeRateList
          exchangeRates={exchangeRates}
          isLoading={isLoading}
          isSortAscending={isSortAscending}
          sortField={sortField}
          onSort={setSorting.bind(this.props.exchangeRatesStore)}
          onEdit={this.openEditModal}
        />
        <EditModal
          exchangeRate={editedExchangeRate!}
          isOpen={isModalOpen}
          onClose={this.closeEditModal}
        />
      </div>
    );
  }

  closeEditModal() {
    this.setState(() => ({
      isModalOpen: false,
      editedExchangeRate: undefined
    }));
  }

  openEditModal(exchangeRate: ExchangeRateView) {
    this.setState(() => ({
      isModalOpen: true,
      editedExchangeRate: exchangeRate
    }));
  }
}
