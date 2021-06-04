import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/entityCore.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString, IsUrl } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  nickName: string;

  @Column({ default: 'https://colorate.azurewebsites.net/SwatchColor/F39C95' })
  @Field((type) => String)
  @IsUrl()
  avatarImg: string;

  @Column({ default: '' })
  @Field((type) => String)
  @IsString()
  description: string;

  @OneToMany((type) => Post, (post) => post.user, { cascade: true })
  @Field((type) => [Post], { nullable: true })
  postList: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(inputPassword: string) {
    return await bcrypt.compare(inputPassword, this.password);
  }
}
