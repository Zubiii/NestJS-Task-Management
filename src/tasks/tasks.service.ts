import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDTO } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getATask(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`task with the id ${id} not found`);
    }
    return found;
  }
  // getATask(id: string): Task {
  //   const found = this.tasks.find((res) => res.id === id);
  //   if (!found)
  //     throw new NotFoundException(`task with the id: ${id} not found`);
  //   return found;
  // }

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // updateATask(id: string, status: TaskStatus) {
  //   const task = this.getATask(id);
  //   task.status = status;
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getATask(id);
  //   this.tasks = this.tasks.filter((tasks) => tasks.id !== found.id);
  // }
}
