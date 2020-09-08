import * as mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const User = mongoose.model<IUser>(
  'User',
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

export default User;
