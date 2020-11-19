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

/* 
  Course resolvers
*/

import { CreateCourseResolver } from './modules/course/Mutations/Create/Create'
import { DeleteCourseResolver } from './modules/course/Mutations/Delete/Delete'
import { CoursesResolver } from './modules/course/Queries/Courses/Courses';

/* 
  Lesson resolvers
*/

import { CreateLessonResolver } from './modules/lesson/Mutations/Create/Create'
import { LessonsResolver } from './modules/lesson/Queries/Lessons/Lessons'

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
    CreateCourseResolver,
    DeleteCourseResolver,
    CoursesResolver,
    CreateLessonResolver,
    LessonsResolver
  ],
  validate: true,
  authChecker,
});

export { schema };
