import * as React from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, ModalFooter
} from 'mdbreact';
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import * as validatorjs from 'validatorjs';
import * as moment from 'moment';
import { ExchangeRateEdit } from '../../../models/exchange-rate.model';
import { DateField, DropdownList, TextField } from '../../../components/form';

interface EditModalProps {
  exchangeRate?: ExchangeRateEdit;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exchangeRate: ExchangeRateEdit) => void;
}

@observer
class EditModal extends React.Component<EditModalProps> {
  @observable private validatedForm: any;

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
                    <DateField
                      name={date.name}
                      value={date.value}
                      label="Date*"
                      htmlFor="date"
                      isValid={date.isValid}
                      error={date.error}
                      onChange={(value) => this.handleDateChange(value!, date.onChange)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      name={rate.name}
                      type={rate.type}
                      label="Rate*"
                      htmlFor="rate"
                      value={rate.value}
                      isValid={rate.isValid}
                      error={rate.error}
                      onChange={rate.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <DropdownList
                      className="target-currency"
                      name={targetCurrency.name}
                      label="Target Currency*"
                      htmlFor="target-currency"
                      options={['USD', 'CHF']}
                      value={targetCurrency.value}
                      isValid={targetCurrency.isValid}
                      error={targetCurrency.error}
                      onChange={targetCurrency.onChange}
                    />
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
}

export default EditModal;
