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
        const req = (await this.patch(`/tasks/${taskID}/status`, { status }, this.config)).data
        return await req
    }

    async createNewTask(title, description) {
        const req = (await this.post(`/tasks`, {title, description}, this.config)).data
        return req
    }

    async updateATask(id, modalData) {
        const req = (await this.patch(`/tasks/${id}/update`, {title: modalData.title, description: modalData.description}, this.config)).data
        return req
    }
}