import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksServices.getAllTasks();
  }

  @Get(':id')
  getATask(@Param('id') id: string) {
    return this.tasksServices.getATask(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksServices.createTask(createTaskDTO);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: string) {
    if (!id) return 'ID is not find.';
    if (!status) return 'STATUS is not found.';
    return this.tasksServices.updateATask(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksServices.deleteTask(id);
  }
}
