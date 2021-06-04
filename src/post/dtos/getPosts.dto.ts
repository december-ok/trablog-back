import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from '../entities/post.entity';

@ObjectType()
export class GetPostsOutput extends CoreEntity {
  @Field((type) => [Post], { nullable: true })
  postList?: Post[];
}
