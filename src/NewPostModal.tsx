import React from 'react';
import { Modal, Input, message } from 'antd';

import { INewPostModalProps } from './types';

type NewPostModalState = {
  link: string;
  confirmLoading: boolean;
}

class NewPostModal extends React.Component<INewPostModalProps> {
  state: NewPostModalState;

  constructor(props: INewPostModalProps) {
    super(props);
    this.state = {
      link: '',
      confirmLoading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleChange(ev: any) {
    this.setState({
      link: ev.target.value,
      confirmLoading: false
    });
  }

  showSuccess(msg: string) {
    message.success(msg);
  }

  showError(msg: string) {
    message.error(msg);
  }


  async handleOk() {
    this.setState({
      confirmLoading: true
    });

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if(!urlRegex.test(this.state.link)) {
      this.setState({
        confirmLoading: false
      });

      this.showError('Please, submit a valid URL');
      return;
    }

    await this.props.onOkHandler(this.state.link);
    this.showSuccess('post submitted succesfully');

    this.setState({
      confirmLoading: false,
      link: ''
    });
    
  }

  render() {
    return(
      <Modal
        okText="Submit"
        title="New Post"
        visible={this.props.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.props.onCancelHandler}
      >
      <label>
        <h5>Post URL</h5>
        <Input onChange={this.handleChange} value={this.state.link} type="url" placeholder="https://super-awesome-engineering.com/blog/1" />
      </label>
      </Modal>
    );
  }

}

export default NewPostModal;