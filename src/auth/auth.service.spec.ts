import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockUser = {
  username: `jest-${Date.now().toString()}@test.com`,
  password: 'P@$$w0rd',
};
const mockJWTService = {
  create: jest.fn((dto) => {
    return {
      id: 'jest-id-9876364',
      ...dto,
      tasks: [],
    };
  }),
  signin: jest.fn(() => {
    return {
      accessToken: 'This is JWT token$qeweqwe212j123k',
    };
  }),
};

describe('Auth Service is testing', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockJWTService)
      .compile();

    authController = module.get(AuthController);
    authService = module.get(AuthService);
  });

  it('AuthController should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('Test create user', () => {
    expect(authService.create).not.toHaveBeenCalled();
    authController.signUp(mockUser);
    expect(authService.create).toHaveBeenCalled();
  });

  it('Test sigin user', () => {
    expect(authService.signin).not.toHaveBeenCalled();
    expect(authController.signIn(mockUser)).toEqual({
      accessToken: expect.any(String),
    });
    expect(authService.signin).toHaveBeenCalled();
  });
});
