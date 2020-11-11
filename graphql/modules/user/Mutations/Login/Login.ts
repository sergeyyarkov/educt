import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server-express';
import { Resolver, Mutation, Arg, Ctx, ObjectType, Field, ID } from 'type-graphql' 
import { IContext } from '../../../../../interfaces'
import { User } from '../../../../entities/User'
import { createTokens } from '../../../../auth/createTokens'

/**
 * 
 * Login user mutation resolver
 * Set cookies and returns AuthData
 * 
 */

@ObjectType()
class AuthData {
  @Field(() => ID)
  id: number;
  
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  patronymic: string;

  @Field()
  token: string;
}

 @Resolver(User)
 export class LoginUserResolver {
   @Mutation(() => AuthData, { description: "Login user" })
   async login(@Arg('login') login: string, @Arg('password') password: string, @Ctx() ctx: IContext): Promise<AuthData> {
    try {
      const user = await User.findOne(login.includes("@") ? { where: { email: login } } : { where: { login: login } })

      if (!user) {
        throw new ApolloError(
          'Такого пользователя не существует!',
          '404 Not Found'
        );
      }

      const validate = await bcrypt.compare(password, user.password);

      if (!validate) {
        throw new ApolloError('Неверный пароль!', '403 Forbidden');
      }

      const tokens = createTokens(user);

      ctx.res.cookie('access-token', tokens.accessToken, {
        httpOnly: true,
        //secure: true, // https
        //domain: 'example.com', // domain
      });

      ctx.res.cookie('refresh-token', tokens.refreshToken, {
        httpOnly: true,
        //secure: true, // https
        //domain: 'example.com', // domain
      });

      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        token: tokens.accessToken,
      };
    } catch (error) {
      throw new ApolloError(error)
    }
   }
 }