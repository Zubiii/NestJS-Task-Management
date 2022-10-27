import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  // Create new User
  @Post('signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    return this.authServices.create(username, password);
  }

  // Signin
  @Post('signin')
  signIn(
    @Body() authCredentialDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authServices.signin(authCredentialDTO);
  }
}
