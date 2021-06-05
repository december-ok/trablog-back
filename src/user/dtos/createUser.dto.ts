import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from '../entities/core.entity';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'nickName',
  'avatarImg',
  'description',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreEntity {}
