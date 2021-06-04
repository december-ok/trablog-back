import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from './auth-user.decorator';
import { AuthGuard } from './auth.guard';
import { CreateUserInput, CreateUserOutput } from './dtos/createUser.dto';
import {
  GetUserProfileInput,
  GetUserProfileOutput,
} from './dtos/getUserProfile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { MeOutput } from './dtos/me.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return await this.userService.createAccount(createUserInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return await this.userService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => GetUserProfileOutput)
  async getUserProfile(
    @Args('input') getUserProfileInput: GetUserProfileInput,
  ): Promise<GetUserProfileOutput> {
    return await this.userService.getUserById(getUserProfileInput);
  }

  @Query((returns) => MeOutput)
  me(@AuthUser() me: User): MeOutput {
    if (me) return { ok: true, user: me };
    else return { ok: false, error: 'Not Logged In' };
  }
}
