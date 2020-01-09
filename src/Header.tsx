import React from 'react';
import { Layout } from 'antd';
import { IHeaderProps } from './types';

const { Header } = Layout;

class MyHeader extends React.Component<IHeaderProps> {

  render() {
    return(
      <Header>
        <h1 style={{fontSize: '2em', textAlign: 'center', color: 'white', textShadow: '2px 2px 0px #1890ff', fontWeight: 'bolder'}}>
          Da System Bar
        </h1>
      </Header>
    );
  }
}

export default MyHeader;
