import React, { Component, PropTypes } from 'react';
import Child from './Child';

export default class Parent extends Component {
  constructor(props) {
    super(props);
    this.value = '';
  }

  render() {
    return (
      <div>
        <Child default={this.value} onChange={(value) => this.value = value} />
        <div>Parent: {this.value}</div>
      </div>
    );
  }
}