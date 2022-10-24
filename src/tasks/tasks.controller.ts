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
import { UpdateTaskStatusDto } from './dto/validate-task-dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksServices.getAllTasks();
  }

  @Get(':id')
  getATask(@Param('id') id: string): Promise<Task> {
    return this.tasksServices.getATask(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksServices.createTask(createTaskDTO);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksServices.updateATask(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksServices.deleteTask(id);
  }
}
