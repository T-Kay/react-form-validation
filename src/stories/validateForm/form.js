import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Input from './input';
import PasswordInput from './password';
import { errorFilter } from './util/errorConverter';
import { validateRequired, validateLength, validateEmail, validateConfirm } from './util/validater';

const Keys = {
  DISPLAY_NAME: 'displayName',
  EMAIL_ADDRESS: 'emailAddress',
  PASSWORD: 'password',
}

const validaters = {
  [Keys.DISPLAY_NAME]: [
    {
      validaterFunc: validateLength,
      options: {
        min: 1,
        max: 31,
      },
    },
    {
      validaterFunc: validateRequired,
    }
  ],
  [Keys.EMAIL_ADDRESS]: [
    {
      validaterFunc: validateLength,
      options: {
        min: 0,
        max: 127,
      },
    },
    {
      validaterFunc: validateEmail,
    },
    {
      validaterFunc: validateRequired,
    },
  ],
  [Keys.PASSWORD]: [
    {
      validaterFunc: validateLength,
      options: {
        min: 8,
        max: 31,
      },
    },
    {
      validaterFunc: validateRequired,
    },
  ],
  confirm: [
    {
      validaterFunc: validateConfirm,
    },
  ],
};
export default class Form extends Component {
  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object),
    handleSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errors: [],
  }

  constructor(props) {
    super(props);
    console.log(validaters);
    this.state = {
      errors: {
        [Keys.DISPLAY_NAME]: { error: true },
        [Keys.EMAIL_ADDRESS]: { error: true },
        [Keys.PASSWORD]: { error: true },
      },
      form: {},
    }
  }

  componentWillMount() {
    this.setErrorState(this.props.errors);
  }

  componentWillReceiveProps(nextProps) {
    this.setErrorState(nextProps.errors);
  }

  setErrorState(errors) {
    this.setState({ errors: {
      [Keys.DISPLAY_NAME]: errorFilter(errors, Keys.DISPLAY_NAME),
      [Keys.EMAIL_ADDRESS]: errorFilter(errors, Keys.EMAIL_ADDRESS),
      [Keys.PASSWORD]: errorFilter(errors, Keys.PASSWORD),
    }});
  }

  isValid() {
    return _.size(_.filter(_.flatten(_.values(this.state.errors)), { error: true })) === 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleSubmit(this.state.form);
    }
  }

  handleOnChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value }),
     });
  }

  handleOnValidated(key, errors) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [key]: errors })
     });
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Input
          name={Keys.DISPLAY_NAME}
          validaters={validaters[Keys.DISPLAY_NAME]}
          errors={this.state.errors.displayName}
          onChange={value => this.handleOnChange(Keys.DISPLAY_NAME, value)}
          onValidated={(errors) => this.handleOnValidated(Keys.DISPLAY_NAME, errors)}
        />
        <Input
          name={Keys.EMAIL_ADDRESS}
          validaters={validaters[Keys.EMAIL_ADDRESS]}
          errors={this.state.errors.emailAddress}
          onChange={value => this.handleOnChange(Keys.EMAIL_ADDRESS, value)}
          onValidated={(errors) => this.handleOnValidated(Keys.EMAIL_ADDRESS, errors)}
        />
        <PasswordInput
          name={Keys.PASSWORD}
          confirmName={`${Keys.PASSWORD}Confirm`}
          label="パスワード"
          confirmLabel="パスワード確認"
          validaters={validaters[Keys.PASSWORD]}
          confirmValidaters={validaters.confirm}
          errors={this.state.errors.emailAddress}
          onChange={value => this.handleOnChange(Keys.PASSWORD, value)}
          onValidated={(errors) => this.handleOnValidated(Keys.PASSWORD, errors)}
        />
        <button disabled={!this.isValid()}>
          送信
        </button>
      </form>
    );
  }
}