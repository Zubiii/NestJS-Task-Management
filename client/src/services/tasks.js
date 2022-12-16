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
    
    async updateTaskStatus(status, taskID) {
        console.log("status => ", status)
        const req = (await this.patch(`/tasks/${taskID}/status`, { status }, this.config)).data
        return await req
    }
}