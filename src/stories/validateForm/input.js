import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    validaters: PropTypes.arrayOf(PropTypes.object),
    errors: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    onValidated: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text',
    errors: [],
  }

  componentWillMount() {
    this.setState(
      {
        errors: this.props.errors,
        value: ''
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  showErrorMessages() {
    return this.state.errors.map((error, index) => (<div key={index}>{error.message}</div>));
  }

  handleOnChange(event) {
    const value = event.target.value;
    const errors = this.props.validaters.map(validater => validater.validaterFunc(value,validater.options));
    this.props.onChange(value);
    this.props.onValidated(errors);
    this.setState({ value, errors });
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          name={this.props.name}
          type={this.props.type}
          onChange={(event) => this.handleOnChange(event)}
        />
        {this.showErrorMessages()}
      </div>
    );
  }
}