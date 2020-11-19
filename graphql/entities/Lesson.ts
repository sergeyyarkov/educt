import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Course } from './Course';

/* 
  Lesson entity
*/

@ObjectType()
@Entity()
export class Lesson extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  content: string;

  @Field(() => Course)
  @ManyToOne(type => Course, course => course.lessons)
  course: Course

  @Field()
  @Column()
  publishedAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
