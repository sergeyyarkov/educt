import * as mongoose from 'mongoose';
import { IUser } from '../../interfaces';

const User = mongoose.model<IUser>(
  'User',
  new mongoose.Schema({
    name: String,
    surname: String,
    patronymic: String,
    login: String,
    email: String,
    password: String,
    roles: [String],
    contacts: [
      {
        name: String,
        link: String,
      },
    ],
  })
);

export default User;
