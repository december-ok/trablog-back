import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostInput extends PickType(Post, [
  'title',
  'tags',
  'thumb',
  'body',
  'text',
]) {}

@ObjectType()
export class CreatePostOutput extends CoreEntity {
  @Field((type) => Post, { nullable: true })
  post?: Post;
}
