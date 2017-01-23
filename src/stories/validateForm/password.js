import React, { Component, PropTypes } from 'react';
import Input from './input';
import _ from 'lodash';

const Keys = {
  MAIN: 'main',
  CONFIRM: 'confirm',
}

export default class Password extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    confirmName: PropTypes.string,
    label: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    type: PropTypes.string,
    validaters: PropTypes.arrayOf(PropTypes.object),
    confirmValidaters: PropTypes.arrayOf(PropTypes.object),
    errors: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    onValidated: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errors: {},
  }

  static rejectError(errors, key) {
    return _.reject(errors, { name: key });
  }

  static filterError(errors, key) {
    return _.filter(errors, { name: key });
  }

  setErrors(errors) {
    this.setState({
      errors: {
          [Keys.MAIN]: Password.rejectError(errors, Keys.CONFIRM),
          [Keys.CONFIRM]: Password.filterError(errors, Keys.CONFIRM),
        }
      });
  }

  componentWillMount() {
    this.setState({ value: '' });
    this.setErrors(this.props.errors);
  }

  componentWillReceiveProps(nextProps) {
    this.setErrors(nextProps.errors);
  }

  mergeError(errors) {
    return _.uniqBy(Object.assign({}, this.state.errors, errors), 'message');
  }

  handleOnChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  handleConfirmOnChange(value) {
    const errors = this.props.confirmValidaters.map(validater => 
      validater.validaterFunc(this.state.value, value, validater.options)
    );
    this.props.onValidated(this.mergeError(errors));
    this.setState({
      errors: {
        [Keys.MAIN]: this.state.errors[Keys.MAIN],
        [Keys.CONFIRM]: errors,
      }
    });
  }

  handleOnValidated(errors) {
    this.setState({
      errors: {
        [Keys.MAIN]: errors,
        [Keys.CONFIRM]: this.state.errors[Keys.CONFIRM],
      }
    });
  }

  render() {
    return (
      <div>
        <Input
          name={this.props.name}
          label={this.props.label}
          validaters={this.props.validaters}
          errors={this.state.errors[Keys.MAIN]}
          onChange={value => this.handleOnChange(value)}
          onValidated={(errors) => this.handleOnValidated(errors)}
        />
        <Input
          name={this.props.confirmName}
          label={this.props.confirmLabel}
          errors={this.state.errors[Keys.CONFIRM]}
          onChange={value => this.handleConfirmOnChange(value)}
        />
      </div>
    );
  }
}