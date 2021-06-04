import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/createUser.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken';
import { secretKey } from 'src/main';
import {
  GetUserProfileInput,
  GetUserProfileOutput,
} from './dtos/getUserProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, nickName }: CreateUserInput) {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is user with that email already.' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, nickName }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return { ok: false, error: 'User not exists with email' };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = jwt.sign({ id: user.id }, secretKey);
      const returnUser = await this.users.findOne({ email });
      return { ok: true, token, user: returnUser };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async getUserById({
    id,
  }: GetUserProfileInput): Promise<GetUserProfileOutput> {
    try {
      const user = await this.users.findOne(
        { id },
        { relations: ['postList'] },
      );
      if (!user) {
        return { ok: false, error: 'User not exists' };
      }
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: error.toString() };
    }
  }
}
