import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getATask(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`task with the id ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    const newTask = await this.tasksRepository.save(task);
    return newTask;
  }

  async updateATask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getATask(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with the ID '${id}' is not found.`);
    }
  }
}
