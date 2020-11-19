import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Lesson } from './Lesson';

/* 
  Course entity
*/

@ObjectType()
@Entity()
export class Course extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Lesson])
  @OneToMany(type => Lesson, lesson => lesson.course, { eager: true })
  lessons: Lesson[]

  @Field()
  @Column()
  publishedAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
