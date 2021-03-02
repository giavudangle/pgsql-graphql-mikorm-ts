import { Post } from "../entities/Post";
import { Arg, Ctx, Query, Resolver, Int, Mutation } from "type-graphql";

import { EntityManagerContextType } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: EntityManagerContextType): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { em }: EntityManagerContextType
  ): Promise<Post | null> {
    return em.findOne(Post, { id: postId })
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: EntityManagerContextType
  ): Promise<Post> {
    const newPost = em.create(Post, { title });
    await em.persistAndFlush(newPost);
    return newPost;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("postId") postId: number,
    @Arg("newTitle", () => String, { nullable: true }) newTitle: string,
    @Ctx() { em }: EntityManagerContextType
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id: postId })
    if (!post) return null;
    if (typeof newTitle !== "undefined") {
      post.title = newTitle;
      await em.persistAndFlush(post)
    }
    return post;
  }


  @Mutation(() => Boolean)
  async deletePost(
    @Arg("postId") id:number,
    @Ctx() {em} : EntityManagerContextType
  ) :Promise<boolean> {
    await em.nativeDelete(Post,{id});
    return true;
  }
}


