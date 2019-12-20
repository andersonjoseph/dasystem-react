import React from 'react';
import { message, Form, Icon, Input, Button } from 'antd';

import { INormalLoginFormProps } from './types';

type NormalLoginState = {
  validateStatusEmail: any;
  errorMsgEmail: string | null;
  validateStatusPassword: any;
  errorMsgPassword: string | null;
  email: string;
  password: string;
  loading: boolean;
}

class NormalLoginForm extends React.Component<INormalLoginFormProps> {
  state: NormalLoginState;

  constructor(props: INormalLoginFormProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validateStatusEmail: 'success',
      errorMsgEmail: null,
      validateStatusPassword: 'success',
      errorMsgPassword: null,
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  showSuccess(msg: string) {
    message.success(msg);
  }

  showError(msg: string) {
    message.error(msg);
  }

  validateEmail(email: string) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(emailRegex.test(email)) {
      return {
        validateStatusEmail: 'success',
        errorMsgEmail: null
      }
    }

    return {
      validateStatusEmail: 'error',
      errorMsgEmail: 'Enter a valid email'
    }

  }

  validatePassword(password: string) {
    if(password.length > 0) {
      return {
        validateStatusPassword: 'success',
        errorMsgPassword: null
      }
    }

   return {
     validateStatusPassword: 'error',
     errorMsgPassword: 'Enter a valid password'
   }

  }

  async handleSubmit(e: any) {
    e.preventDefault();

    const email = this.state.email;
    if(this.validateEmail(email).validateStatusEmail === 'error') {
      return;
    }

    const password = this.state.password;
    if(this.validatePassword(password).validateStatusPassword === 'error') {
      return;
    }

    this.setState({
      loading: true
    });

    try {
      await this.props.loginHandler(email, password);
    } catch(err) {
      if(err.response && err.response.status === 401) {
        this.showError('Invalid credentials');
      }
      else {
        this.showError('Something bad happened');
      }
      this.setState({
        loading: false
      });
      return
    }


    this.showSuccess('Logged in succesfully');
    this.setState({
      loading: false
    });

    this.props.onCancel();
  }

  handleEmailChange(e: any) {
    const email = e.target.value;

    this.setState({
      ...this.validateEmail(email),
      email: email
    });
  }

  handlePasswordChange(e: any) {
    const password = e.target.value;

    this.setState({
      ...this.validatePassword(password),
      password: password
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        <Form.Item help={this.state.errorMsgEmail} validateStatus={this.state.validateStatusEmail}>
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </Form.Item>

        <Form.Item help={this.state.errorMsgPassword} validateStatus={this.state.validateStatusPassword}>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={this.state.loading} block={true} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

export {NormalLoginForm};
