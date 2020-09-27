import Roles from './roles'
import Errors from './errors'
import { IContext } from "../../interfaces"

const Auth = {
  isAuthenticated: (context: IContext): void => {
    if (!context.isAuth) throw Errors.aunthentication
  },
  isAdmin: function (context: IContext): void {
    this.isAuthenticated(context)

    if (context.roles !== undefined && !context.roles.includes(Roles.ADMIN)) {
      throw Errors.permission
    }
  },
  isOwner: function (context: IContext): void {
    if (context.roles !== undefined && !context.roles.includes(Roles.OWNER)) {
      this.isAuthenticated(context)

      throw Errors.permission
    }
  }
}

export default Auth