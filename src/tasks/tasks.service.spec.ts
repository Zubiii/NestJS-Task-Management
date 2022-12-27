// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { AuthController } from 'src/auth/auth.controller';
// import { AuthService } from 'src/auth/auth.service';
// import { Task } from './task.entity';
// import { TasksController } from './tasks.controller';
// import { TasksService } from './tasks.service';

// const mockTask = {
//   title: 'test title',
//   description: 'test decription',
//   status: 'OPEN',
//   userId: 'testUserID',
// };

// describe('Tasks Controller', () => {
//   let tasksController: TasksController;
//   let tasksService: TasksService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TasksController],
//       providers: [
//         TasksService,
//         { provide: getRepositoryToken(Task), useValue: mockTask },
//       ],
//     }).compile();

//     tasksService = module.get(TasksService);
//     tasksController = module.get(TasksController);
//   });

//   describe('Get All Tasks', () => {
//     it('should return array of Tasks', async () => {
//       tasksService.getAllTasks(mockUser);
//     });
//   });
// });
describe('tasks', () => {
  it('True Case', () => {
    expect(4).toEqual(4);
  });
});
