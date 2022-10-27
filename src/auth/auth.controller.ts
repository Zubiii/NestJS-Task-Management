import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  //Signin
  @Post('signin')
  signIn(
    @Body() authCredentialDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authServices.signin(authCredentialDTO);
  }

  //test
  @Get('test')
  @UseGuards(AuthGuard())
  test(@Req() req: any) {
    console.log(req);
  }
}
