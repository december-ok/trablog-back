import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from '../entities/core.entity';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreEntity {
  @Field((returns) => String, { nullable: true })
  token?: string;

  @Field((returns) => User, { nullable: true })
  user?: User;
}
