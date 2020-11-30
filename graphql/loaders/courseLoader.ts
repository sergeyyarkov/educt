import DataLoader from "dataloader";
import { Course } from "../entities/Course";

export const courseLoader = () => new DataLoader<number, Course>(async (ids) => {
  const courses = await Course.findByIds(ids as number[])
  const courseMap: Record<string, Course> = {};
  courses.forEach(course => {
    courseMap[course.id] = course
  })

  const sortedCourses = ids.map(id => courseMap[id])

  return sortedCourses
})
