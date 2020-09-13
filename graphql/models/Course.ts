import * as mongoose from 'mongoose';
import { ICourse } from '../../interfaces';

const Course = mongoose.model<ICourse>(
  'Course',
  new mongoose.Schema({
    title: String,
    description: String,
    teacherId: String,
    studentIds: [String],
    publishedAt: Date,
    updatedAt: Date,
  })
);

export default Course;
