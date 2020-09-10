import * as mongoose from 'mongoose';
import { IUser } from '../../interfaces';

const User = mongoose.model<IUser>(
  'User',
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roles: [String],
  })
);

export default User;
