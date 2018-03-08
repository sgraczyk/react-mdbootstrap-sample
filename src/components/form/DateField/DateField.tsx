import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../form.css';

interface DateFieldProps {
  name: string;
  value: moment.Moment;
  isValid: boolean;
  label?: string;
  htmlFor?: string;
  error?: string;
  onChange: (date: moment.Moment) => void;
}

const DateField = ({ name, value, isValid, label, htmlFor, error, onChange }: DateFieldProps): JSX.Element => (
  <div className="date-field md-form">
    <DatePicker
      className="form-control"
      name={name}
      selected={value}
      onChange={onChange}
    />
    {label &&
      <label className="form-label" htmlFor={htmlFor}>{label}</label>}

    {!isValid &&
      <span className="validation-error">{error}</span>}
  </div>
);

export default DateField;
