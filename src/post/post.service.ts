import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { GetPostsOutput } from './dtos/getPosts.dto';
import { CreatePostOutput, CreatePostInput } from './dtos/createPost.dto';
import { GetPostInput, GetPostOutput } from './dtos/getPost.dto';
import { User } from 'src/user/entities/user.entity';
import { SearchPostInput, SearchPostOutput } from './dtos/searchPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import {
  TagSearchPostInput,
  TagSearchPostOutput,
} from './dtos/tagSearchPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}

  async getPosts(): Promise<GetPostsOutput> {
    try {
      const postList = await this.posts.find({ relations: ['user'], take: 9 });
      return { ok: true, postList };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async createPost(
    createPostInput: CreatePostInput,
    me: User,
  ): Promise<CreatePostOutput> {
    try {
      const post = await this.posts.save(
        this.posts.create({ ...createPostInput, user: me }),
      );
      return { ok: true, post };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async getPost({ id }: GetPostInput): Promise<GetPostOutput> {
    try {
      const post = await this.posts.findOne({ id }, { relations: ['user'] });
      if (!post) {
        return { ok: false, error: 'Post not found.' };
      }
      return { ok: true, post };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async searchPost({
    search,
    skipFrom,
  }: SearchPostInput): Promise<SearchPostOutput> {
    try {
      const pL = await this.posts
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.user', 'user')
        .orderBy('post.createdAt', 'DESC')
        .where('post.title ILIKE :search', { search: `%${search}%` })
        .orWhere(`array_to_string(post.tags,',') ILIKE :search`, {
          search: `%${search}%`,
        })
        .orWhere('post.text ILIKE :search', { search: `%${search}%` })
        .skip(skipFrom)
        .take(9)
        .getMany();
      return { ok: true, postList: pL };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async tagSearchPost({
    tag,
    skipFrom,
  }: TagSearchPostInput): Promise<TagSearchPostOutput> {
    try {
      const pL = await this.posts
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.user', 'user')
        .orderBy('post.createdAt', 'DESC')
        .where(`array_to_string(post.tags,',') ILIKE :search`, {
          search: `%${tag}%`,
        })
        .skip(skipFrom)
        .take(9)
        .getMany();
      return { ok: true, postList: pL };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }

  async deletePost(
    { id }: DeletePostInput,
    me: User,
  ): Promise<DeletePostOutput> {
    try {
      const post = await this.posts.findOne({ id }, { relations: ['user'] });
      if (!post) {
        return { ok: false, error: 'Post not found.' };
      }
      if (post.user.id !== me.id) {
        return { ok: false, error: "You don't have Permission to Delete." };
      }
      await this.posts.delete({ id });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.toString() };
    }
  }
}
