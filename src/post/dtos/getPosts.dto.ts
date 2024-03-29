import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class GetPostsInput {
  @Field((type) => Int)
  skipFrom: number;
}

@ObjectType()
export class GetPostsOutput extends CoreEntity {
  @Field((type) => [Post], { nullable: true })
  postList?: Post[];
}
