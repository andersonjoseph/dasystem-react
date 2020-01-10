import React from 'react';

import { Icon, Divider, Card, Tag, Row, Col, Typography, Button, Popover, message } from 'antd';

import { gold } from '@ant-design/colors';

import { IPostProps } from './types';

const { Title } = Typography;

type PostState = {
  favorited: boolean;
}

class Post extends React.Component<IPostProps> {
  state: PostState;
  constructor(props: IPostProps) {
    super(props);

    this.state = {
      favorited: this.props.favorited
    }

    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleShareNavigatorClick = this.handleShareNavigatorClick.bind(this);
  }

  showMessage(msg: string) {
    message.info(msg);
  }

  handleFavorite() {
    if(!window.sessionStorage.getItem('token')) {
      this.showMessage('You must login first');
      return;
    }

    if(this.state.favorited) {
      this.props.unFavoritePostHandler(this.props.id);
      this.setState({
        favorited: false
      });
    }
    else {
      this.props.favoritePostHandler(this.props.id);
      this.setState({
        favorited: true
      });
    }
  }

  generateTags(tags: string[]) {
    return tags.map((tag, i) => <Tag key={i} className="post-tag">{tag}</Tag>)
  }

  handleShareNavigatorClick() {

    let navigator: any;
    navigator = window.navigator;
    navigator.share({
        title: 'Engine Curated',
        text: this.props.title,
        url: this.props.link
    });

  }

  favoriteButton() {

    if(this.state.favorited) {
      return (
        <Button type="link" size="small" style={{color: gold.primary}} onClick={this.handleFavorite}>
          <Icon type="star" theme="filled" />
          Favorite
        </Button>
      );
    }

    return (
      <Button type="link" size="small" style={{color: gold.primary}} onClick={this.handleFavorite}>
        <Icon type="star" />
        Favorite
      </Button>
    )
  }

  shareButton() {
    let navigator: any;
    navigator = window.navigator;
    if (navigator.share) {
      return(
        <Button type="link" size="small" onClick={this.handleShareNavigatorClick}>
            <Icon type="share-alt" />
            Share
        </Button>
      )
    }

    const shareText = `${this.props.title} | ${this.props.link} | Via: Da System Bar`;
    const shareLinks = (
      <div>
        <a
        className="twitter-share-button"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?text=${escape(shareText)}`}
        data-size="large">
          <Icon type="twitter" />
          Twitter
        </a>

        <br />

        <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.link}`}
        target="_blank"
        rel="noopener noreferrer">
          <Icon type="facebook" theme="filled" />
          Facebook
        </a>
      </div>
    );

    return (
      <Popover content={shareLinks} title="Share" trigger="click">
        <Button type="link" size="small">
            <Icon type="share-alt" />
            Share
        </Button>
      </Popover>
    )

  }

  render() {
    return(
      <Card className="post" style={{background: `linear-gradient(rgba(80, 80, 80, 0.5), rgba(0, 0, 0, 0.72)),url("${this.props.imageUrl}")`}}>
        <Typography>
          <Title underline level={3} style={{textAlign: 'left'}}>
            <a style={{color: 'white'}} target="_blank" rel="noopener noreferrer" href={this.props.link}>
              {this.props.title}
            </a>
          </Title>
        </Typography>

        <Divider/>

          <div>
            <a target="_blank" rel="noopener noreferrer" href={this.props.authorLink}>{this.props.authorName}</a>
            <Divider type="vertical" />
            {this.favoriteButton()}
            <Divider type="vertical" />
            {this.shareButton()}

          </div>

          <br />

          <Row>
            <Col lg={20} md={20} sm={24}>
              <div>
                {this.generateTags(this.props.tags)}
              </div>
            </Col>

            <Col lg={4} md={4} sm={24} style={{textAlign: 'right'}}>
              <time style={{color: 'white'}}>{this.props.date}</time>
            </Col>

          </Row>

        </Card>
    );
  }
}

export default Post;
