import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ControlledParent from './controlled/Parent';
import ControlledChild from './controlled/Child';
import UnControlledParent from './uncontrolled/Parent';
import UnControlledChild from './uncontrolled/Child';
import Form from './validateForm/form';
import Input from './validateForm/input';
import Password from './validateForm/password';
import { validateLength, validateConfirm } from './validateForm/util/validater';

storiesOf('Form', module)
  .add('Input', () => {
    const validaters = [
      {
        validaterFunc: validateLength,
        options: {
          min: 1,
          max: 10,
        }
      }
    ];
    const errors = [
      {
        message: 'これはだめです。'
      }
    ];
    return (
      <Input
        name="tanmen"
        validaters={validaters}
        errors={errors}
        onChange={action('onChange')}
        onValidated={action('onValidated')}
      />
    )
  })
  .add('Password', () => {
    const mainValidater = [
      {
        validaterFunc: validateLength,
        options: {
          min: 1,
          max: 10,
        }
      }
    ];
    const confirmValidater = [
      {
        validaterFunc: validateConfirm,
      }
    ];
    const errors = [
      {
        message: 'これはだめです。'
      }
    ];
    return (
      <Password
        name="Main"
        confirmName="Confirm"
        label="パスワード"
        confirmLabel="パスワード確認"
        validaters={mainValidater}
        confirmValidaters={confirmValidater}
        errors={errors}
        onChange={action('onChange')}
        onValidated={action('onValidated')}
      />
    );
  })
  .add('Form', () => {
    const errors = [
      {
        type: 'Validation',
        reason: 'validation error',
        params: [
          {
            key: 'password',
            rejectedValue: 'hogehogefdsafdsa',
          },
          {
            key: 'displayName',
            rejectedValue: 'hogehogehogehogehogehogehogehogehogehoge',
          },
          {
            key: 'emailAddress',
            rejectedValue: 'r78@',
          },
        ],
      },
    ];
    return (
      <Form errors={errors} handleSubmit={action('submit')} />
    );
  });
storiesOf('Controlled', module)
  .add('ControlledChild', () => (
    <ControlledChild default="test" onChange={action('onChange')} />
  ))
  .add('ControlledParent', () => (
    <ControlledParent />
  ));
storiesOf('UnControlled', module)
  .add('UnControlledChild', () => (
    <UnControlledChild default="test" onChange={action('onChange')} />
  ))
  .add('UnControlledParent', () => (
    <UnControlledParent />
  ));