import React from 'react';
import Post from './Post';

import { IPostListProps } from './types';

class PostList extends React.Component<IPostListProps> {

  generatePosts() {
    const posts = this.props.posts.map(
      (postData) => 
      <Post 
        key={postData.id}
        id={postData.id}
        link={postData.link} 
        title={postData.title} 
        authorName={postData.authorName} 
        authorLink={postData.authorLink}
        date={postData.date}
        tags={postData.tags}
        imageUrl={postData.imageUrl}
        favorited={postData.favorited}
        favoritePostHandler={this.props.favoritePostHandler}
        unFavoritePostHandler={this.props.unFavoritePostHandler}
      />
      );

    return posts;
  }

  render() {
    return(
      <div>{this.generatePosts()}</div>
    );
  }
}

export default PostList;