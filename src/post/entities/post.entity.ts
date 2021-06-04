import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/entityCore.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Post extends CoreEntity {
  @Column()
  @Field((type) => String)
  @Length(1)
  title: string;

  @Column('text', { array: true })
  @Field((type) => [String])
  tags: string[];

  @Column({
    default:
      'https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg',
  })
  @Field((type) => String, {
    defaultValue:
      'https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg',
  })
  @IsString()
  thumb: string;

  @Column()
  @Field((type) => String)
  @Length(1)
  body: string;

  @Column()
  @Field((type) => String)
  @Length(1)
  text: string;

  @Column({ default: 0 })
  @Field((type) => Number)
  likes: number;

  @ManyToOne((type) => User, (user) => user.postList, { onDelete: 'CASCADE' })
  @Field((type) => User)
  user: User;
}
