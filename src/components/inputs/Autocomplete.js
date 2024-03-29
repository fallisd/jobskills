/* eslint-disable jsx-a11y/no-autofocus  */

import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  options: [],
};

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  }

  handleSelect = (value) => {
    const { onSubmit } = this.props;
    this.handleChange(value);
    if (onSubmit) {
      onSubmit(value);
    }
  }

  render() {
    const { value } = this.state;
    const { options } = this.props;
    return (
      <ReactAutocomplete
        items={options}
        value={value}
        getItemValue={item => item}
        onChange={e => this.handleChange(e.target.value)}
        onSelect={val => this.handleSelect(val)}
        shouldItemRender={(item, val) => (
          item.toLowerCase().indexOf(val.toLowerCase()) > -1
        )}
        renderInput={props => (
          <input
            className='autocomplete-input'
            spellCheck='false'
            autoFocus
            {...props}
          />
        )}
        renderItem={(item, highlighted) => (
          <div
            key={item}
            className='autocomplete-item'
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
          >
            {item}
          </div>
        )}
      />
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
