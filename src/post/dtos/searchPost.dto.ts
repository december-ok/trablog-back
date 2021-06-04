import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class SearchPostInput {
  @Field((type) => String)
  search: string;

  @Field((type) => Int)
  skipFrom: number;
}

@ObjectType()
export class SearchPostOutput extends CoreEntity {
  @Field((type) => [Post], { nullable: true })
  postList?: Post[];
}
