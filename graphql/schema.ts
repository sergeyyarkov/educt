import { buildSchemaSync } from 'type-graphql';
import { authChecker } from '../utils/authChecker';

/* 
  User resolvers
*/

import { UsersResolver } from './modules/user/Queries/Users/Users';
import { UserResolver } from './modules/user/Queries/User/User';
import { MeResolver } from './modules/user/Queries/Me/Me';
import { LoginUserResolver } from './modules/user/Mutations/Login/Login';
import { LogoutUserResolver } from './modules/user/Mutations/Logout/Logout';
import { RegisterUserResolver } from './modules/user/Mutations/Register/Register';
import { DeleteUserResolver } from './modules/user/Mutations/Delete/Delete';
import { UpdateUserResolver } from './modules/user/Mutations/Update/Update';
import { ChangeUserPasswdResolver } from './modules/user/Mutations/ChangePasswd/ChangePasswd';

const schema = buildSchemaSync({
  resolvers: [
    UsersResolver,
    UserResolver,
    MeResolver,
    LoginUserResolver,
    LogoutUserResolver,
    RegisterUserResolver,
    DeleteUserResolver,
    UpdateUserResolver,
    ChangeUserPasswdResolver,
  ],
  validate: true,
  authChecker,
});

export { schema };
