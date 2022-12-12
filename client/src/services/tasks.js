import BaseHttpService from "./base-http";

export default class Tasks extends BaseHttpService {
    config = {
        headers: {
            Authorization: `Bearer ${this.getToken()}`
        }
    }

    async getTasks() {
        const req = (await this.get('/tasks', this.config)).data
        return await req
    }
}