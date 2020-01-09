import React from 'react';
import { Layout, Menu, Icon, message } from 'antd';

import NewPostModal from './NewPostModal';
import UserModal from './UserModal';
import AboutModal from './AboutModal';

import { ISidebarProps } from './types';

const {Sider} = Layout;

type SideBarState = {
  newPostModalVisible: boolean;
  userModalVisible: boolean;
  aboutModalVisible: boolean;
}

class Sidebar extends React.Component<ISidebarProps> {
  state: SideBarState;

  constructor(props: ISidebarProps) {
    super(props);

    this.state = {
      newPostModalVisible: false,
      userModalVisible: false,
      aboutModalVisible: false,
    }

    this.handleLatestPostsClick = this.handleLatestPostsClick.bind(this);
    this.handleFavoritePostsClick = this.handleFavoritePostsClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.handleAboutClick = this.handleAboutClick.bind(this);

    this.handleCancelPostModal = this.handleCancelPostModal.bind(this);
    this.handleSubmitPostClick = this.handleSubmitPostClick.bind(this);

    this.handleCancelUserModal = this.handleCancelUserModal.bind(this);
    this.handleCancelAboutModal = this.handleCancelAboutModal.bind(this);
  }

  showMessage(msg: string) {
    message.info(msg);
  }

  handleCancelUserModal() {
    this.setState({
      userModalVisible: false
    });
  }

  handleCancelPostModal() {
    this.setState({
      newPostModalVisible: false
    });
  }

  handleCancelAboutModal() {
    this.setState({
      aboutModalVisible: false
    });
  }

  handleLatestPostsClick() {
    this.props.handleLatestPosts();
  }

  handleFavoritePostsClick() {
    if(window.sessionStorage.getItem('token')) {
      this.props.handleFavPosts();
    }
    else {
      this.showMessage('You must login first');
      this.handleUserClick();
    }
  }

  handleNewPostClick() {
    this.setState({
      newPostModalVisible: true
    });
  }

  handleUserClick() {
    this.setState({
      userModalVisible: true
    });
  }

  handleAboutClick() {
    this.setState({
      aboutModalVisible: true
    });
  }

  async handleSubmitPostClick(link: string) {
    await this.props.handleSubmitPost(link);
  }

  render() {
    return(
      <Sider breakpoint="md" collapsedWidth="80" theme="light">

        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} style={{textAlign: 'left'}} >

          <Menu.Item key="1" onClick={this.handleLatestPostsClick} style={{fontSize: 'large'}}>
            <Icon type="clock-circle" />
            <span className="nav-text">Latests</span>
          </Menu.Item>

          <Menu.Item key="2" onClick={this.handleFavoritePostsClick} style={{fontSize: 'large'}}>
            <Icon type="star" theme="filled" />
            <span className="nav-text">My Favorites</span>
          </Menu.Item>

          <Menu.Divider></Menu.Divider>

          <Menu.Item key="3" onClick={this.handleUserClick} style={{fontSize: 'large'}}>
            <Icon type="user" />
            <span className="nav-text">User</span>
          </Menu.Item>

          <Menu.Item key="4" onClick={this.handleNewPostClick} style={{fontSize: 'large'}}>
            <Icon type="plus-circle" />
            <span className="nav-text">New Post</span>
          </Menu.Item>

          <Menu.Divider></Menu.Divider>

          <Menu.Item key="6" onClick={this.handleAboutClick} style={{fontSize: 'large'}}>
            <Icon type="info" />
            <span className="nav-text-circle">About</span>
          </Menu.Item>

        </Menu>

        <NewPostModal
          visible = { this.state.newPostModalVisible }
          onCancelHandler = { this.handleCancelPostModal }
          onOkHandler = { this.handleSubmitPostClick }
        />

        <UserModal
          visible = { this.state.userModalVisible }
          onCancel = { this.handleCancelUserModal }
          loginHandler = { this.props.loginHandler }
          signinHandler = {this.props.signinHandler}
        />

        <AboutModal
          visible = { this.state.aboutModalVisible }
          onCancelHandler = { this.handleCancelAboutModal }
        />

      </Sider>

      );
  }
}

export default Sidebar;
