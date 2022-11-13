import BaseHttpService from './base-http';
import HttpHandler from '@/helpers/HttpHandler';

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    const req = await this.post('/auth/signin', { username, password });
    const { accessToken, error, message, statusCode } =
      HttpHandler.HttpHandler(req);

    // Success
    if (accessToken) {
      this._accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      return {
        username: username,
      };
    }
    // Return Error
    if (error) {
      return {
        error,
        message,
        statusCode,
      };
    }
  }

  async signup(username, password) {
    const req = await this.post('/auth/signup', { username, password });
    const { accessToken, error, message, statusCode } =
      HttpHandler.HttpHandler(req);

    if (accessToken) {
      this._accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      return {
        username: username,
      };
    }
    if (error) {
      return {
        error,
        message,
        statusCode,
      };
    }
  }

  logout() {
    this._accessToken = null
    localStorage.removeItem('username')
    localStorage.removeItem('accessToken')
  }
}
