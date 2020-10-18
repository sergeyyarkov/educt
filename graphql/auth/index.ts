import Roles from './roles';
import Errors from './errors';
import { IContext } from '../../interfaces';

const Auth = {
  isAuthenticated: (context: IContext): void => {
    if (!context.req.userId) throw Errors.aunthentication;
  },
  isAdmin: function (context: IContext): void {
    this.isAuthenticated(context);

    if (
      context.req.userId &&
      !context.req.userRoles?.includes(Roles.ADMIN)
    ) {
      throw Errors.permission;
    }
  },
  isOwner: function (context: IContext): void {
    if (
      context.req.userId &&
      !context.req.userRoles?.includes(Roles.OWNER)
    ) {
      this.isAuthenticated(context);

      throw Errors.permission;
    }
  },
};

export default Auth;
