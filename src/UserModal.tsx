import React from 'react';
import { Modal, Button, message } from 'antd';

import { NormalLoginForm } from './LoginForm';
import { RegistrationForm } from './RegisterForm';
import { IUserModalProps } from './types';

type UserModalState = {
  modal: any;
  title: string;
}

class UserModal extends React.Component<IUserModalProps> {
  state: UserModalState;
  currentModal: () => JSX.Element | null;
  loginModal: () => JSX.Element | null;
  registerModal: () => JSX.Element | null;
  userModal: (userEmail: string) => JSX.Element | null;
  defaultModal: () => JSX.Element | null;

  constructor(props: IUserModalProps) {
    super(props);

    this.state = {
      modal: null,
      title: 'User'
    }

    this.loginModal = () => <NormalLoginForm onCancel={this.handleCancel} loginHandler={this.props.loginHandler} />;
    this.registerModal = () => <RegistrationForm onCancel={this.handleCancel} signinHandler={this.props.signinHandler} />;
    this.defaultModal = () => (
        <div style={{textAlign: 'center'}}>
          <Button type="primary" block={true} size="large" onClick={this.showRegisterModal}>Register</Button>
          <br />
          <small>You already have an account?</small>
          <Button type="ghost" block={true} onClick={this.showLoginModal}>Login</Button>
        </div>
    );

    this.userModal = (userEmail: string) => (
      <div style={{textAlign: 'center'}}>
        <h3>Logged in as: {userEmail}</h3>
        <br />
        <Button type="danger" ghost block={true} onClick={this.handleLogout}>Logout</Button>
      </div>
    );

    this.currentModal = () => {
      if(window.sessionStorage.getItem('token') && window.sessionStorage.getItem('email')) {
        return this.userModal(window.sessionStorage.getItem('email') || '');
      }
      return this.defaultModal();
    }

    this.handleCancel = this.handleCancel.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.showRegisterModal = this.showRegisterModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.userModal = this.userModal.bind(this);

  }

  componentDidMount() {
    this.setState({
      modal: this.currentModal()
    });
  }

  showMessage(msg: string) {
    message.info(msg);
  }

  showRegisterModal() {
    this.setState({
      modal: this.registerModal(),
      title: 'Register'
    });
  }

  showLoginModal() {
    this.setState({
      modal: this.loginModal(),
      title: 'Login'
    });
  }

  handleLogout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('email');

    this.showMessage('Logout succesfully');
    this.props.onCancel();

    this.setState({
      modal: this.currentModal()
    })
  }

  handleCancel() {
    this.setState({
      modal: this.currentModal(),
      title: 'User'
    });

    this.props.onCancel();
  }

  render() {
    return(
      <Modal
         title={this.state.title}
         visible={ this.props.visible }
         onCancel={ this.handleCancel }
         footer={ null }
       >
       {this.state.modal}
      </Modal>
    );
  }

}

export default UserModal;