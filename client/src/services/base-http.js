import axios from 'axios';

export default class BaseHttpService {
  BaseURL = process.env.VUE_APP_BASE_URL || 'http:localhost:3000/api';
  _accessToken = null;

  constructor(routerStore) {
    this.routerStore = routerStore;
  }

  async get(endpoint, options = {}) {
    return await axios.get(`${this.BaseURL}${endpoint}`, options).catch((err) => err);
  }

  async post(endpoint, data, options = {}) {
    return await axios
      .post(`${this.BaseURL}${endpoint}`, data, options)
      .catch((err) => err);
  }

  async patch(endpoint, data, options = {}) {
    return await axios.patch(`${this.BaseURL}${endpoint}`, data, options);
  }

  saveToken(accessToken) {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToekn', accessToken);
  }

  getToken() {
    if(localStorage.getItem('accessToken')){
      return  localStorage.getItem('accessToken')
    }
    return this._accessToken
  }
}
