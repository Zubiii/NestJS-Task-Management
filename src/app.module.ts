import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'zubiii',
      database: 'task-managment',
      entities: [Task],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
