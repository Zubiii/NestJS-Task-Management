import axios from "axios";

export default class BaseHttpService {
    BaseURL = process.env.VUE_APP_BASE_URL || 'http:localhost:3000/api'
    _accessToken = null

    constructor(routerStore){
        this.routerStore = routerStore
    }

    async get(endpoint, options = {}) {
        return axios.get(`${this.BaseURL}${endpoint.slice(1)}`, options)
            .catch( err => err)
    }

    async post(endpoint, data, options = {}) {
        return axios.post(`${this.BaseURL}${endpoint.slice(1)}`, data, options)
            .catch( err => err)
    }

    async patch(endpoint, data, options = {}) {
        return axios.patch(`${this.BaseURL}${endpoint.slice(1)}`, data, options)
    }

    saveToken(accessToken) {
        this._accessToken = accessToken
        return localStorage.setItem('accessToekn', accessToken)
    }
}