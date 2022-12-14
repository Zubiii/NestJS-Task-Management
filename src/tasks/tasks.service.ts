import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('Tasks Services', { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user } });
  }

  async getATask(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`task with the id ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    try {
      const { title, description } = createTaskDTO;
      const task = this.tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user,
      });
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create Task for User: ${user.id}. Task : ${createTaskDTO}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateATaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getATask(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async updateATask(
    id: string,
    user: User,
    title: string,
    description: string,
  ): Promise<Task> {
    const task = await this.getATask(id, user);
    task.title = title;
    task.description = description;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with the ID '${id}' is not found.`);
    }
  }
}
