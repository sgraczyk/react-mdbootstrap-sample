import * as React from 'react';
import { observer } from 'mobx-react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact';
import { observable, action, computed } from 'mobx';
import '../form.css';

interface DropdownListProps {
  className?: string;
  name: string;
  value: string;
  options: string[];
  isValid: boolean;
  label?: string;
  htmlFor?: string;
  error?: string;
  onChange: (option: string) => void;
}

@observer
export default class DropdownList extends React.Component<DropdownListProps> {
  @observable private isDropdownOpen = false;

  constructor(props: DropdownListProps) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  @computed
  get classes() {
    return ['form-control', this.props.className].filter(Boolean).join(' ');
  }

  render() {
    const { value, options, label, htmlFor, isValid, error, onChange } = this.props;
    return (
      <div className="dropdown-list md-form">
        <Dropdown
          className={this.classes}
          isOpen={this.isDropdownOpen}
          toggle={this.toggleDropDown}
        >
          <DropdownToggle caret={true} color="primary">
            {value}
          </DropdownToggle>
          <DropdownMenu>
            {options && options.map(option => (
              <DropdownItem
                key={option}
                onClick={() => onChange(option)}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {label &&
          <label className="form-label" htmlFor={htmlFor}>{label}</label>}

        {!isValid &&
          <span className="validation-error">{error}</span>}
      </div>
    );
  }

  @action
  private toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
