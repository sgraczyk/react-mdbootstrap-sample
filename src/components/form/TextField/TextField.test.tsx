import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import TextField from './';

describe('TextField', () => {
  it('renders properly with required only props', () => {
    const wrapper = shallow(<TextField
      name='text-field-name'
      value='text-field-value'
      isValid={true}
      type='text'
      onChange={() => { }}
    />);

    const input = wrapper.find('input');
    expect(input.props().value).toBe('text-field-value');
    expect(input.props().type).toBe('text');

    const label = wrapper.find('label');
    expect(label.length).toBe(0);

    const errorSpan = wrapper.find('span .validation-error');
    expect(errorSpan.length).toBe(0);
  });

  it('renders properly with additional props', () => {
    const wrapper = shallow(<TextField
      name='text-field-name'
      value='text-field'
      isValid={false}
      error='text-field-error'
      type='text'
      label='text-field-label'
      htmlFor='text-field-html-for'
      onChange={() => { }}
    />);

    const label = wrapper.find('label');
    expect(label.text()).toBe('text-field-label');
    expect(label.props().htmlFor).toBe('text-field-html-for');

    const errorSpan = wrapper.find('span .validation-error');
    expect(errorSpan.text()).toBe('text-field-error');
  });

  it('error is not rendered for valid field', () => {
    const wrapper = shallow(<TextField
      name='text-field-name'
      value='text-field'
      isValid={true}
      error='text-field-error'
      type='text'
      onChange={() => { }}
    />);

    const errorSpan = wrapper.find('span .validation-error');
    expect(errorSpan.length).toBe(0);
  });

  it('onChange handler triggers', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<TextField
      name='text-field-name'
      value='text-field'
      isValid={true}
      type='text'
      onChange={onChange}
    />);

    wrapper.find('input').simulate('change');
    expect(onChange.callCount).toBe(1);
  });
});
