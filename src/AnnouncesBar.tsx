import React from 'react';
import { Typography, Card, Input } from 'antd';

const { Title } = Typography;

interface IAnnouncesBar {
}

class AnnouncesBar extends React.Component<IAnnouncesBar> {

  render() {
    return(
      <React.Fragment>

        <Card>
          <Title level={4}>Donate</Title>
          <p>You like this project? Please, consider making a donation! :D</p>
          <p><strong>BTC: </strong><Input readOnly defaultValue="1FDz7vTJGvb4atjDuDdi5Re2JCTQv279QY" /></p>
          <p><strong>ETH: </strong><Input readOnly defaultValue="0x3C60Ed3E373593E5C232Ecb44ab38edA0ec7A202" /></p>
        </Card>

        <Card style={{textAlign: 'center'}}>
          <p>
            Made with <span role="img" aria-label="heart">❤️</span>by <a target="_blank" rel="noopener noreferrer" href="https://andersonjoseph.github.io">Anderson Joseph</a>
          </p>
        </Card>

      </React.Fragment>
    );
  }
}

export default AnnouncesBar;