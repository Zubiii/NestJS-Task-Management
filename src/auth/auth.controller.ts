import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  // Create new User
  @Post('signup')
  signUp(@Body() authCredentials: AuthCredentials): Promise<void> {
    const { username, password } = authCredentials;

    return this.authServices.create(username, password);
  }
}
