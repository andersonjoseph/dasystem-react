import React from 'react';
import { Layout } from 'antd';
import { IHeaderProps } from './types';

const { Header } = Layout;

class MyHeader extends React.Component<IHeaderProps> {

  render() {
    return(
      <Header>
        <h1 style={{textAlign: 'center'}}><a className='title' style={{color: 'white'}} href="/">Da System Bar</a></h1>
      </Header>
    );
  }
}

export default MyHeader;