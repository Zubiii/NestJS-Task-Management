import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getATask(id: string): Task {
    const task = this.tasks.find((res) => {
      if (res.id === id) {
        return res;
      }
    });
    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateATask(id: string, status: string): Task {
    const task = this.getATask(id);
    if (status === TaskStatus.IN_PROGRESS) {
      task.status = TaskStatus.IN_PROGRESS;
    }
    if (status === TaskStatus.DONE) {
      task.status = TaskStatus.DONE;
    }
    return task;
  }

  deleteTask(id: string): void {
    this.tasks.find((res, index) => {
      if (res.id === id) {
        this.tasks.splice(index, 1);
      }
    });
  }
}
