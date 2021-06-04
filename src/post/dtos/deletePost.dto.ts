import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from '../entities/post.entity';

@InputType()
export class DeletePostInput extends PickType(Post, ['id']) {}

@ObjectType()
export class DeletePostOutput extends CoreEntity {}
