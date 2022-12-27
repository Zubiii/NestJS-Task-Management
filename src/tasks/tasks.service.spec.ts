import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTask = {
  title: 'test title',
  description: 'test decription',
  status: 'OPEN',
  userId: 'testUserID',
};
const mockUser = {
  id: 'jest-id-9876364',
  username: `jest-${Date.now().toString()}@test.com`,
  password: 'P@$$w0rd',
  tasks: [],
};

const mockTaskService = {
  createTask: jest.fn((dto) => {
    return {
      id: 'random-id-32',
      ...dto,
    };
  }),
  getAllTasks: jest.fn(() => {
    return [];
  }),
};

describe('Tasks Controller is testing', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(mockTaskService)
      .compile();

    tasksController = module.get(TasksController);
    tasksService = module.get(TasksService);
  });

  it('Task Controller should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('create Task', () => {
    expect(tasksService.createTask).not.toHaveBeenCalled();
    expect(tasksController.createTask(mockTask, mockUser)).toEqual({
      description: expect.any(String),
      id: expect.any(String),
      status: expect.any(String),
      title: expect.any(String),
      userId: expect.any(String),
    });
    expect(tasksService.createTask).toHaveBeenCalled();
  });

  it('Get All Tasks', () => {
    expect(tasksService.getAllTasks).not.toHaveBeenCalled();
    expect(tasksController.getAllTasks(mockUser)).toEqual([]);
    expect(tasksService.getAllTasks).toHaveBeenCalled();
  });
});
