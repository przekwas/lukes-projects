import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	token: string;

	@Column({ nullable: true })
	expiresAt?: Date;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
