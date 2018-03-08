import * as React from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, ModalFooter,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact';
import DatePicker from 'react-datepicker';
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import * as validatorjs from 'validatorjs';
import * as moment from 'moment';
import { ExchangeRateEdit } from '../../../models/exchange-rate.model';
import 'react-datepicker/dist/react-datepicker.css';

interface EditModalProps {
  exchangeRate?: ExchangeRateEdit;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exchangeRate: ExchangeRateEdit) => void;
}

@observer
class EditModal extends React.Component<EditModalProps> {
  @observable private validatedForm: any;
  @observable private isDropdownOpen: boolean;

  constructor(props: EditModalProps) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentWillReceiveProps(props: EditModalProps) {
    if (props.exchangeRate) {
      runInAction(() => {
        this.setupForm({
          targetCurrency: props.exchangeRate!.targetCurrency,
          ...props.exchangeRate!
        });
      });
    }
  }

  render() {
    const { isOpen, onClose } = this.props;
    let date, rate, targetCurrency;
    if (this.validatedForm) {
      date = this.validatedForm.$('date');
      rate = this.validatedForm.$('rate');
      targetCurrency = this.validatedForm.$('targetCurrency');
    }

    return (
      <div className="edit-modal">
        {this.validatedForm &&
          <Modal className="exchange-rate-edit-modal" isOpen={isOpen}>
            <ModalHeader>Edit Exchange Rate</ModalHeader>
            <ModalBody>
              <div className="edit-form">
                <div className="row">
                  <div className="col-6">
                    <div className="md-form">
                      <DatePicker
                        className="form-control"
                        name={date.name}
                        selected={date.value}
                        onChange={(value) => this.handleDateChange(value!, date.onChange)}
                      />
                      <label className="form-label" htmlFor="date">Date*</label>
                      {!date.isValid &&
                        <span className="validation-error">{date.error}</span>}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="md-form">
                      <input
                        className="form-control"
                        name={rate.name}
                        type={rate.type}
                        value={rate.value}
                        onChange={rate.onChange}
                      />
                      <label className="form-label" htmlFor="date">Rate*</label>
                      {!rate.isValid &&
                        <span className="validation-error">{rate.error}</span>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="md-form">
                      <Dropdown
                        className="form-control target-currency"
                        isOpen={this.isDropdownOpen}
                        toggle={this.toggleDropDown}
                      >
                        <DropdownToggle caret={true} color="primary">
                          {targetCurrency.value}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => targetCurrency.onChange('USD')}>
                            USD
                          </DropdownItem>
                          <DropdownItem onClick={() => targetCurrency.onChange('CHF')}>
                            CHF
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <label className="form-label" htmlFor="target-currency">Target Currency*</label>
                      {!targetCurrency.isValid &&
                        <span className="validation-error">{targetCurrency.error}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={onClose}>Close</Button>{' '}
              <Button
                color="primary"
                disabled={!this.validatedForm.isValid}
                onClick={this.validatedForm.onSubmit}
              >
                Save changes
              </Button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }

  @action
  private setupForm({ id, date, rate, targetCurrency }: ExchangeRateEdit) {
    const onSubmit = this.props.onSubmit;
    const plugins = { dvr: validatorjs };
    const fields = [{
      name: 'id',
      value: id,
    },
    {
      name: 'date',
      value: date,
      rules: 'required',
      options: {
        validateOnChange: true,
      }
    }, {
      name: 'rate',
      value: rate.toString(),
      rules: 'required|numeric|between:0,100',
      options: {
        validateOnChange: true,
      }
    }, {
      name: 'targetCurrency',
      value: targetCurrency,
      rules: 'required|string',
      options: {
        validateOnChange: true,
      }
    }];

    const hooks = {
      onSuccess(form: any) {
        const values = form.values();
        onSubmit({ ...values });
      }
    };

    this.validatedForm = new MobxReactForm({ fields }, { plugins, hooks });
  }

  @action
  private handleDateChange(value: moment.Moment, onChange: (value?: moment.Moment) => void) {
    value = value || undefined;
    onChange(value);
  }

  @action
  private toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

export default EditModal;
