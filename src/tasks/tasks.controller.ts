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
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/validate-task-dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { UpdateATaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksServices.getAllTasks(user);
  }

  @Get(':id')
  getATask(@GetUser() user: User, @Param('id') id: string): Promise<Task> {
    return this.tasksServices.getATask(id, user);
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
    @GetUser() user: User,
  ) {
    return this.tasksServices.updateATaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }

  @Patch(':id/update')
  updateTask(
    @Body() updateTask: UpdateATaskDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.tasksServices.updateATask(
      id,
      user,
      updateTask.title,
      updateTask.description,
    );
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksServices.deleteTask(id, user);
  }
}
