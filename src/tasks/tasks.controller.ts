import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/validate-task-dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
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
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksServices.createTask(createTaskDTO, user);
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
