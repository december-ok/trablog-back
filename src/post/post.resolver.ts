import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { GetPostsOutput } from './dtos/getPosts.dto';
import { GetPostInput, GetPostOutput } from './dtos/getPost.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/auth.guard';
import { AuthUser } from 'src/user/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { SearchPostInput, SearchPostOutput } from './dtos/searchPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import {
  TagSearchPostInput,
  TagSearchPostOutput,
} from './dtos/tagSearchPost.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => GetPostsOutput)
  async getPosts(): Promise<GetPostsOutput> {
    return await this.postService.getPosts();
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => CreatePostOutput)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @AuthUser() me: User,
  ): Promise<CreatePostOutput> {
    return await this.postService.createPost(createPostInput, me);
  }

  @Query((returns) => GetPostOutput)
  async getPost(
    @Args('input') getPostInput: GetPostInput,
  ): Promise<GetPostOutput> {
    return await this.postService.getPost(getPostInput);
  }

  @Mutation((returns) => SearchPostOutput)
  async searchPost(
    @Args('input') SearchPostInput: SearchPostInput,
  ): Promise<SearchPostOutput> {
    return await this.postService.searchPost(SearchPostInput);
  }

  @Mutation((returns) => TagSearchPostOutput)
  async tagSearchPost(
    @Args('input') tagSearchPostInput: TagSearchPostInput,
  ): Promise<TagSearchPostOutput> {
    return await this.postService.tagSearchPost(tagSearchPostInput);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => DeletePostOutput)
  async deletePost(
    @Args('input') deletePostInput: DeletePostInput,
    @AuthUser() me: User,
  ): Promise<DeletePostOutput> {
    return await this.postService.deletePost(deletePostInput, me);
  }
}
