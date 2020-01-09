import React from 'react';
import { Modal, Card, Input, Divider } from 'antd';

import { IAboutModalProps } from './types';

class AboutModal extends React.Component<IAboutModalProps> {

  render() {
    return(
      <Modal
        title="About"
        visible={this.props.visible}
        onCancel={this.props.onCancelHandler}
        footer={null}
      >
        <Card>

          <h3>Da System Bar</h3>

          <p>Da System Bar collects cool news about software and systems engineering. You can submit an article, and after a review, it could be published in the feed!</p>

          <Divider />

          <h3>Donate</h3>
          <p>You like this project? Please, consider making a donation! It will help to pay for a <strong>hosting</strong> and a <strong>domain name</strong>.</p>
          <p><strong>BTC: </strong><Input readOnly defaultValue="1FDz7vTJGvb4atjDuDdi5Re2JCTQv279QY" /></p>
          <p><strong>ETH: </strong><Input readOnly defaultValue="0x3C60Ed3E373593E5C232Ecb44ab38edA0ec7A202" /></p>

          <Divider />

          <h3>Contact</h3>
          <p>
            If you want to say hi, or want to tell me something that could interest me, please send an email to <a href="mailto:andersonjoseph@mailfence.com">andersonjoseph@mailfence.com</a>
          </p>

          <Divider />
          <p style={{textAlign: 'center'}}>
            Made with <span role="img" aria-label="heart">❤️</span>by <a target="_blank" rel="noopener noreferrer" href="https://andersonjoseph.github.io"> Anderson Joseph</a>
          </p>


        </Card>
      </Modal>
    );
  }

}

export default AboutModal;
