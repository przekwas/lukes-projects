import { Exclude } from 'class-transformer';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user'
}

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, length: 250 })
	email: string;

	@Column({ name: 'display_name', unique: true, length: 50 })
	displayName: string;

	@Exclude()
	@Column()
	password: string;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
	role: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt: Date | null;
}
