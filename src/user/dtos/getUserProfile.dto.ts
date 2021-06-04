import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from '../entities/core.entity';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserProfileInput extends PickType(User, ['id']) {}

@ObjectType()
export class GetUserProfileOutput extends CoreEntity {
  @Field((type) => User, { nullable: true })
  user?: User;
}
