import { Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity } from "typeorm";
import { Field, ObjectType, ID } from 'type-graphql'
import { Roles } from '../modules/user/enums'

/* 
  User entity
*/

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field({ description: "Returns full name in format Name Surname Patronymic" })
	fullname: string;

	@Field()
	@Column()
	surname: string;

	@Field()
	@Column()
	patronymic: string;

	@Field()
	@Column('text', { unique: true })
	login: string;

	@Column()
	password: string;

	@Field()
	@Column('text', { unique: true })
	email: string;

	@Field(() => [Roles])
	@Column('text', { array: true })
	roles: Roles[];

	@Field(() => [Contact])
	@Column('jsonb', { array: false, default: () => "'[]'", nullable: false })
	contacts: Contact[]
}

@ObjectType()
class Contact {	
	@Field()
	@Column()
	link: string;

	@Field()
	@Column()
	name: string;
}