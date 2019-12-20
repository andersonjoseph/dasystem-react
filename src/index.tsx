import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import App from './App';

import { IAppHandler } from './types';
import { HOST } from './config';

const cache = setupCache({
  exclude: {query: false}
});

const api = axios.create({
  adapter: cache.adapter
});

class AppHandler implements IAppHandler {

  baseURL: string;
  params: any;
  constructor() {
    this.baseURL = `${HOST}/wp-json/api/v1/articles`;
    this.params = {};
  }

  buildURL() {
    let URL = this.baseURL;

    const keys = Object.keys(this.params);

    if(keys.length > 0) {
      URL += '/?';
    }

    for(const key of keys) {
      URL+= `${key}=${this.params[key]}&`;
    }

    return URL.endsWith('&') ? URL.substring(0, URL.length-1) : URL;
  }

  async getPosts() {
    const URL = this.buildURL();

    const res = await api.get(URL, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      }
    });

    return res.data;
  }

  async loginHandler(email: string, password: string) {
    const res = await api.post(`${HOST}/wp-json/api/v1/users/auth`, {
      email: email,
      pass: password
    });

    return res.data;
  }

  async signinHandler(email: string, password: string) {
    await api.post(`${HOST}/wp-json/api/v1/users`, {
      email: email,
      pass: password
    });

  }
 
  async getPostsFilteredByHandler(filter: string) {
    this.params.filter = filter;
    delete this.params.orderby;
    delete this.params.page;
    this.baseURL = `${HOST}/wp-json/api/v1/articles`;
    const posts = await this.getPosts();

    return posts;
  }

  async getPostsByTagsHandler(tags: string[]) {
    delete this.params.page;
    this.params.tags = tags.join(',');
    const posts = await this.getPosts();

    return posts;
  }

  async getLatestPostsHandler() {
    delete this.params.page;
    this.baseURL = `${HOST}/wp-json/api/v1/articles`;
    delete this.params.orderby;
    const posts = await this.getPosts();

    return posts;
  }

  async getFavPostsHandler() {
    this.baseURL = `${HOST}/wp-json/api/v1/articles/favorites`;
    delete this.params.page;
    delete this.params.orderby;
    const posts = await this.getPosts();

    return posts;
  }

  async searchPostsHandler(query: string) {
    this.baseURL = `${HOST}/wp-json/api/v1/articles/search`;
    this.params.query = query;
    delete this.params.page;
    delete this.params.orderby;
    const posts = await this.getPosts();

    return posts;
  }

  async suscribeUserHandler(user: string) {
  }

  async submitPostHandler(link: string) {
    await api.post(`${HOST}/wp-json/api/v1/articles`, {
      link: link
    });
  }

  async getTagsHandler() {
    const res = await api.get(`${HOST}/wp-json/api/v1/tags`);

    return res.data;
  }

  async favoritePostHandler(article: number) {
    const res = await api.put(`${HOST}/wp-json/api/v1/articles/${article}/favorite`,{} , {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      }
    });

    return res.data;
  }

  async unFavoritePostHandler(article: number) {
    return this.favoritePostHandler(article);
  }

  async nextPageHandler(page: number) {
    this.params.page = page;
    const posts = await this.getPosts();

    return posts;
  }
}

ReactDOM.render(
  <App 
    handler = {new AppHandler()}
  />,
  document.getElementById('root')
);
