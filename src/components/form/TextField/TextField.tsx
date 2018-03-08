import * as React from 'react';
import '../form.css';

interface TextFieldProps {
  name: string;
  type: 'text' | 'email' | 'password';
  value: string;
  isValid: boolean;
  label?: string;
  htmlFor?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const TextField = ({ name, type, value, isValid, label, htmlFor, error, onChange }: TextFieldProps): JSX.Element => (
  <div className="text-field md-form">
    <input
      className="form-control"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
    {label &&
      <label className="form-label" htmlFor={htmlFor}>{label}</label>}

    {!isValid &&
      <span className="validation-error">{error}</span>}
  </div>
);

export default TextField;
