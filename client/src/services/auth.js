import BaseHttpService from "./base-http";
import HttpHandler from "@/helpers/HttpHandler";

export default class AuthService extends BaseHttpService {
    async signin(username, password) {
        const req = await this.post('/auth/signin', { username, password})
        const { accessToken, error, message, statusCode} = HttpHandler.HttpHandler(req)
        // Success
        if(accessToken) {
            this._accessToken = accessToken
            localStorage.setItem('accessToken', accessToken)
            return {
                username: username
            }
        }
        // Return Error
        if(error) {
            return {
                error,
                message,
                statusCode
            }
        }

    }
}