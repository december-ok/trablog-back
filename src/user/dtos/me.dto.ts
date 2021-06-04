import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from '../entities/core.entity';
import { User } from '../entities/user.entity';

@ObjectType()
export class MeOutput extends CoreEntity {
  @Field((type) => User, { nullable: true })
  user?: User;
}
