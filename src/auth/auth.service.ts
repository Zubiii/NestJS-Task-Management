import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string) {
    const user = this.userRepository.create({
      username,
      password,
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
}
