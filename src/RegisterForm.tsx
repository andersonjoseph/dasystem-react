import React from 'react';
import { IRegistrationFormProps } from './types';
import { Form, Input, Icon, Button, message } from 'antd';

type RegistrationformState = {
  validateStatusEmail: any;
  errorMsgEmail: string | null;
  validateStatusPassword: any;
  errorMsgPassword: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  errorMsgConfirmPassword: string | null;
  validateStatusConfirmPassword: any;
  loading: boolean;
}

class RegistrationForm extends React.Component<IRegistrationFormProps> {
  state: RegistrationformState;

  constructor(props: IRegistrationFormProps) {
    super(props);
    this.state = {
      validateStatusEmail: 'success',
      errorMsgEmail: null,
      validateStatusPassword: 'success',
      errorMsgPassword: null,
      email: '',
      password: '',
      confirmPassword: '',
      errorMsgConfirmPassword: null,
      validateStatusConfirmPassword: 'success',
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
  }

  showSuccess(msg: string) {
    message.success(msg);
  }

  showError(msg: string) {
    message.error(msg);
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

    const confirmPassword = this.state.confirmPassword;
    if(this.validateConfirmPassword(password, confirmPassword).validateStatusConfirmPassword === 'error') {
      return;
    }

    this.setState({
      loading: true
    });

    console.log('hacked');
    try {
      await this.props.signinHandler(email, password);
    } catch(err) {
      if(err.response) {
        this.showError(err.response.data.message);
      }
      else {
        this.showError('Something bad has happened');
      }

      this.setState({
        loading: false
      });
      return;
    }

    this.setState({
      loading: false
    });

    this.showSuccess('Registered succesfully. You can now log in');

    this.props.onCancel();
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

    if(password.length > 4) {
      return {
        validateStatusPassword: 'success',
        errorMsgPassword: null
      }
    }

    return {
      validateStatusPassword: 'error',
      errorMsgPassword: 'Youy password must have 4 or more characters'
    }

  }

  validateConfirmPassword(password: string, confirmPassword: string) {

    if(password === confirmPassword) {
      return {
        validateStatusConfirmPassword: 'success',
        errorMsgConfirmPassword: null
      }
    }

    return {
      validateStatusConfirmPassword: 'error',
      errorMsgConfirmPassword: 'Passwords not match'
    }

  }

  handleEmailChange(e: any) {
    const email = e.target.value;

    this.setState({
      ...this.validateEmail(email),
      email: email,
    });
  }

  handlePasswordChange(e: any) {
    const password = e.target.value;

    this.setState({
      ...this.validatePassword(password),
      password: password,
    });
  }

  handleConfirmPasswordChange(e: any) {
    const confirmPassword = e.target.value;

    this.setState({
      ...this.validateConfirmPassword(this.state.password, confirmPassword),
      confirmPassword: confirmPassword,
    }); 

  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item help={this.state.errorMsgEmail} validateStatus={this.state.validateStatusEmail} label="E-mail" hasFeedback>
          <Input 
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={this.handleEmailChange} 
            value={this.state.email}
          />
        </Form.Item>
        <Form.Item help={this.state.errorMsgPassword} validateStatus={this.state.validateStatusPassword} label="Password" hasFeedback>
          <Input.Password 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={this.state.password} 
            onChange={this.handlePasswordChange}
          />
        </Form.Item>
        <Form.Item help={this.state.errorMsgConfirmPassword} validateStatus={this.state.validateStatusConfirmPassword} label="Confirm Password" hasFeedback>
          <Input.Password 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={this.state.confirmPassword} 
            onChange={this.handleConfirmPasswordChange} 
          />
        </Form.Item>

        <Form.Item>
          <Button loading={this.state.loading} block={true} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export { RegistrationForm };
