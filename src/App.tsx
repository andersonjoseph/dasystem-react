import React from 'react';
import { Layout, Row, Col, Affix, BackTop, Spin, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './App.css';
import 'antd/dist/antd.css';

import Sidebar from './Sidebar';
import Header from './Header';
import PostList from './PostList';
import AnnouncesBar from './AnnouncesBar';
import TopMenu from './TopMenu';

import { IAppProps, IPostObject } from './types';

const { Content } = Layout;

type AppState = {
  posts: IPostObject[];
  tags: string[];
  loadingPosts: boolean;
  hasMorePosts: boolean;
  loadingNextPage: any;
}

class App extends React.Component<IAppProps> {
  state: AppState;
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      posts: [],
      tags: [],
      loadingPosts: false,
      hasMorePosts: false,
      loadingNextPage: null
    }

    this.handleFilterPosts = this.handleFilterPosts.bind(this);
    this.handlePostsByTags = this.handlePostsByTags.bind(this);
    this.handleLatestPosts = this.handleLatestPosts.bind(this);
    this.handleFavPosts = this.handleFavPosts.bind(this);
    this.handleSearchPosts = this.handleSearchPosts.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  componentDidMount() {

    this.setState({
      loadingPosts: true
    });

    this.props.handler.getTagsHandler()
      .then((tags) => {
        this.setState({
          tags: tags
        });
      });

    this.props.handler.getLatestPostsHandler()
      .then((posts) => {

        this.setState({posts: posts}, () => {
          this.setState({
            loadingPosts: false,
            hasMorePosts: true
          });

        } );

      });
  }

  async handleLogin(email: string, password: string) {

    const user = await this.props.handler.loginHandler(email, password);

    window.sessionStorage.setItem('email', user.email);
    window.sessionStorage.setItem('token', user.token);
  }

  async handleSignin(email: string, password: string) {
    await this.props.handler.signinHandler(email, password);
  }

  async handleSubmitPost(link: string) {
    await this.props.handler.submitPostHandler(link);
  }

  async handleFilterPosts(filter: string) {
    this.setState({loadingPosts: true});
    const posts = await this.props.handler.getPostsFilteredByHandler(filter);

    this.setState({
      posts: posts,
      loadingPosts: false
    });
  }

  async handlePostsByTags(tags: string[]) {
    this.setState({loadingPosts: true});
    const posts = await this.props.handler.getPostsByTagsHandler(tags);

    this.setState({
      posts: posts,
      loadingPosts: false
    });
    
  }

  async handleLatestPosts() {
    this.setState({loadingPosts: true});
    const posts = await this.props.handler.getLatestPostsHandler();

    this.setState({
      posts: posts,
      loadingPosts: false
    });
  }

  async handleFavPosts() {
    this.setState({loadingPosts: true});
    const posts = await this.props.handler.getFavPostsHandler();

    this.setState({
      posts: posts,
      loadingPosts: false
    });
  }

  async handleSearchPosts(query: string) {
    this.setState({loadingPosts: true});
    const posts = await this.props.handler.searchPostsHandler(query);

    this.setState({
      posts: posts,
      loadingPosts: false
    });

  }

  async handleNextPage(page: number) {


    const nextPagePosts = await this.props.handler.nextPageHandler(page);
    if(nextPagePosts.length === 0) {
      this.setState({
        hasMorePosts: false
      });
    }
    const posts = this.state.posts.concat(nextPagePosts);

    this.setState({
      posts: posts
    });

  }

  loadingNextPage() {
    if(this.state.hasMorePosts) {
      return <Card style={{textAlign: 'center'}}><Spin/></Card>
    }
    return null;
  }

  render() {
    return(
      <div className="App">
        <Layout>

          <Header />

          <Layout>
            <Sidebar 
              handleLatestPosts = { this.handleLatestPosts }
              handleFavPosts = { this.handleFavPosts }
              handleSubmitPost = { this.handleSubmitPost }
              loginHandler = { this.handleLogin }
              signinHandler = { this.handleSignin }
            />

            <Content style={{height: '90vh'}} id="content">
              <InfiniteScroll
                  pageStart={0}
                  loadMore={this.handleNextPage}
                  hasMore={this.state.hasMorePosts}
                  useWindow={false}
              >

                <Row>

                  <Col lg={16} md={24}>
                    <TopMenu 
                      handleSearchPosts = { this.handleSearchPosts }
                      handlePostsByTags = { this.handlePostsByTags }  
                      handleFilterPosts = { this.handleFilterPosts }  
                      tags = { this.state.tags } 
                    />
                    <Spin spinning={this.state.loadingPosts}>
                      
                        <PostList 
                          posts = { this.state.posts } 
                          favoritePostHandler={this.props.handler.favoritePostHandler} 
                          unFavoritePostHandler={this.props.handler.unFavoritePostHandler} 
                        />
                        {this.loadingNextPage()}

                    </Spin>
                  </Col>

                  <Col lg={8} md={24} sm={0} xs={0}>
                    <Affix target={() => window.document.getElementById('content') || window}>
                      <AnnouncesBar/>
                    </Affix>
                  </Col>

                  <BackTop target={() => window.document.getElementById('content') || window} />

                </Row>

              </InfiniteScroll>

            </Content>

          </Layout>

        </Layout>
      </div>
    );
  }

}

export default App;