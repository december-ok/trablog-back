import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class GetPostInput extends PickType(Post, ['id']) {}

@ObjectType()
export class GetPostOutput extends CoreEntity {
  @Field((type) => Post, { nullable: true })
  post?: Post;
}
