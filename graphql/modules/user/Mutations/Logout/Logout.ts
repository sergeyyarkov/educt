import { Resolver, Mutation, Authorized, Ctx } from 'type-graphql'
import { IContext } from '../../../../../interfaces'
import { User } from '../../../../entities/User'

/**
 * 
 * Logout user mutatation resolver
 * Сlears the context and returns status
 * Authorized: USER
 * 
 */

@Resolver(User)
export class LogoutUserResolver {
  @Authorized()
  @Mutation(() => String, { description: 'Сlears the context and returns status' })
  logout(@Ctx() ctx: IContext): string {
    ctx.res.clearCookie('access-token')
    ctx.res.clearCookie('refresh-token')
    delete ctx.req.userId
    delete ctx.req.userRoles
    return '200 OK'
  }
}