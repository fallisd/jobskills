import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
};

const defaultProps = {
  text: '',
  onClick: null,
  className: 'button',
  icon: null,
};

class Button extends Component {
  handleClick = (event) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }

  render() {
    const { text, className, icon } = this.props;
    const value = icon || text;
    return (
      <div
        className={className}
        role='button'
        tabIndex={0}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
      >
        {value}
      </div>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
