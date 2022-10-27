import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string) {
    // Generate salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      // dublicate username
      if (error.code === '23505')
        throw new ConflictException('Username is already exists');
      else throw new InternalServerErrorException();
    }
  }

  async signin(authCredentialDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialDTO;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'sucess';
    } else {
      throw new UnauthorizedException('Username or password is wrong');
    }
  }
}
