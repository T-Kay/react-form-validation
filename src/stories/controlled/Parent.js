import React, { Component, PropTypes } from 'react';
import Child from './Child';

export default class Parent extends Component {
  componentWillMount() {
    this.setState({value: ''});
  }

  render() {
    return (
      <div>
        <Child default={this.state.value} onChange={(value) => this.setState({ value })} />
        <div>Parent: {this.state.value}</div>
      </div>
    );
  }
}