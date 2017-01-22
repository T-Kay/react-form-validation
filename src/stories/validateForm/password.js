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
    confirmLabel: PropTypes.stirng,
    type: PropTypes.string,
    validaters: PropTypes.arrayOf(PropTypes.object),
    confirmValidaters: PropTypes.arrayOf(PropTypes.object),
    errors: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    onValidated: PropTypes.func.isRequired,
  }

  static defaultProps = {
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

  mergeError(errors) {
    return _.uniqBy(Object.assign({}, this.state.errors, errors), 'message');
  }

  filterError() {
    return _.reject(this.state.errors, { name: 'confirm' });
  }

  filterConfirmError() {
    return _.filter(this.state.errors, { name: 'confirm' });
  }

  handleOnChange(value) {
    this.props.onChange(value);
    this.setState({ value });
  }

  handleConfirmOnChange(value) {
    const errors = mergeError(this.props.confirmValidaters.map(
      validater => validater.validaterFunc(this.state.value, value, validater.options),
    ));
    this.props.onValidated(errors);
    this.setState({ errors });
  }

  handleOnValidated(errors) {
    const allError = mergeError(errors);
    this.props.onValidated(allError);
    this.setState({ errors: allError });
  }

  render() {
    return (
      <div>
        <Input
          name={this.props.name}
          validaters={this.props.validaters}
          errors={this.filterError()}
          onChange={value => this.handleOnChange(value)}
          onValidated={(errors) => this.handleOnValidated(errors)}
        />
        <Input
          name={this.props.confirmName}
          errors={this.filterConfirmError()}
          onChange={value => this.handleConfirmOnChange(value)}
        />
      </div>
    );
  }
}