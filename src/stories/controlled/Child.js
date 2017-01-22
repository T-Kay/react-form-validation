import React, { Component, PropTypes } from 'react';

export default class Child extends Component {
  static propTypes = {
    default: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({value: ''});
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.value);
  }

  handleOnChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
    this.setState({ value });
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