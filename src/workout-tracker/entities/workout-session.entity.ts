import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	DeleteDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'workout_sessions' })
export class WorkoutSession {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	// deleting user will soft delete session data
	@ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ name: 'session_date', type: 'timestamp' })
	sessionDate: Date;

	@Column({ nullable: true })
	location?: string;

	@Column({ type: 'text', nullable: true })
	notes?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt: Date | null;
}
