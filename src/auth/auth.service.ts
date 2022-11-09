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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-passport.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async signin(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        username,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Username or password is wrong');
    }
  }
}
