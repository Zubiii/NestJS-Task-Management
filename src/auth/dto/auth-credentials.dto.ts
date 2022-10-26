import { IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentials {
  @MinLength(4)
  @IsString()
  username: string;

  @MinLength(8)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
