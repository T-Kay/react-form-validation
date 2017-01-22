import React, { Component, PropTypes } from 'react';

export default class Child extends Component {
  static propTypes = {
    default: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.value = '';
  }

  handleOnChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
    this.value = value;
  }

  render() {
    return (
      <div>
        <input onChange={(event) => this.handleOnChange(event)} />
        <div>Child: {this.props.default}</div>
      </div>
    );
  }
}