import { User } from '../entities/User';
import { EntityManagerContextType } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

@ObjectType()
class ErrorResponse {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: EntityManagerContextType
  ):Promise<UserResponse> {

    if(options.username.length <= 3) {
      return {
        errors:[{
          field:'Username',
          message:'Username length must be greater than 3'
        }]
      }
    }

    if(options.password.length <= 3) {
      return {
        errors:[{
          field:'Password',
          message:'Password length must be greater than 3'
        }]
      }
    }

    const hashedPassword = await argon2.hash(options.password);

    const user = em.create(User, { 
      username: options.username, 
      password: hashedPassword 
    })

    try {
      await em.persistAndFlush(user);
    } catch(e){
      if(e.code === '23505' || e.detail.include('Key already exists.')){
        return {
          errors:[{
            field:"username",
            message:"username already taken"
          }]
        }
      }
      console.log("Something went wrong ", e)
    }
    return {user};
  }



  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: EntityManagerContextType
  ): Promise<UserResponse> {

    if(options.username.length <= 3) {
      return {
        errors:[{
          field:'Username',
          message:'Username length must be greater than 3'
        }]
      }
    }

    if(options.password.length <= 3) {
      return {
        errors:[{
          field:'Password',
          message:'Password length must be greater than 3'
        }]
      }
    }

    const user = await em.findOneOrFail(User, { username: options.username.toLowerCase() })

    if (!user) {
      return {
        errors: [{
          field: "username",
          message: "Username doesn't exist"
        }]
      }
    }

    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [{
          field: 'password',
          message: 'password incorrect'
        }]
      }
    }
    return {
      user
    }
  }

}