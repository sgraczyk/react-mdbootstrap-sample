import * as React from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, ModalFooter,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { ExchangeRateView } from '../../../stores/exchange-rates.store';
import 'react-datepicker/dist/react-datepicker.css';

interface EditModalProps {
  exchangeRate: ExchangeRateView;
  isOpen: boolean;
  onClose: () => void;
}

@observer
class EditModal extends React.Component<EditModalProps> {
  @observable formModel: ExchangeRateView;
  @observable isDropdownOpen: boolean;

  constructor(props: EditModalProps) {
    super(props);

    this.setDate = this.setDate.bind(this);
    this.setRate = this.setRate.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentWillReceiveProps(props: EditModalProps) {
    runInAction(() => {
      this.formModel = props.exchangeRate;
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    return (
      <div>
        <Modal className="exchange-rate-edit-modal" isOpen={isOpen}>
          <ModalHeader>Edit Exchange Rate</ModalHeader>
          <ModalBody>
            {this.formModel &&
              <div className="edit-form">
                <div className="row">
                  <div className="col-6">
                    <div className="md-form">
                      <DatePicker
                        className="form-control"
                        name="date"
                        selected={this.formModel.date}
                        onChange={this.setDate}
                      />
                      <label className="date-label" htmlFor="date">Date</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="md-form">
                      <input
                        className="form-control"
                        name="rate"
                        type="text"
                        value={this.formModel.rate.toString()}
                        onChange={this.setRate}
                      />
                      <label className="date-label" htmlFor="date">Rate</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Dropdown isOpen={this.isDropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle caret={true} color="primary">
                      {this.formModel.targetCurrency}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.setTargetCurrency('USD')}>USD</DropdownItem>
                      <DropdownItem onClick={() => this.setTargetCurrency('CHF')}>CHF</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={onClose}>Close</Button>{' '}
            <Button color="primary" onClick={onClose}>Save changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  @action
  setDate(date: moment.Moment | null) {
    if (date) {
      this.formModel.date = date!;
    }
  }

  @action
  setRate(event: React.ChangeEvent<HTMLInputElement>) {
    this.formModel.rate = event.target.value
      ? parseFloat(event.target.value)
      : 0;
  }

  @action
  setTargetCurrency(targetCurrency: string) {
    this.formModel.targetCurrency = targetCurrency;
  }

  @action
  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

export default EditModal;
