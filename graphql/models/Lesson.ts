import * as mongoose from 'mongoose';
import { ILesson } from '../../interfaces';

const Lesson = mongoose.model<ILesson>(
  'Lesson',
  new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    content: String,
    courseId: String,
    publishedAt: Date,
    updatedAt: Date,
  })
);

export default Lesson;
