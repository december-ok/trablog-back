import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class GetUserPostsInput extends PickType(User, ['id']) {
  @Field((type) => Int)
  skipFrom: number;
}

@ObjectType()
export class GetUserPostsOutput extends CoreEntity {
  @Field((type) => [Post], { nullable: true })
  postList?: Post[];
}
