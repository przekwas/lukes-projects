import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm';
import { WorkoutSession } from './workout-session.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'session_exercises' })
export class SessionExercise {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	/**
	 * FK -> workout_sessions.id
	 * On delete, set to null if the workout session is removed.
	 */
	@ManyToOne(() => WorkoutSession, { onDelete: 'SET NULL', nullable: true })
	@JoinColumn({ name: 'workout_id' })
	workoutSession: WorkoutSession | null;

	/**
	 * FK -> exercises.id
	 * On delete, set to null if the exercise is removed.
	 */
	@ManyToOne(() => Exercise, { onDelete: 'SET NULL', nullable: true })
	@JoinColumn({ name: 'exercise_id' })
	exercise: Exercise | null;

	/**
	 * Optional ordering index for the exercise in a session (e.g. 1st, 2nd, 3rd…)
	 */
	@Column({ name: 'order_index', type: 'int', nullable: true })
	orderIndex?: number;

	/**
	 * Any additional notes about this exercise (e.g. “keep elbows in”)
	 */
	@Column({ type: 'text', nullable: true })
	notes?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt: Date | null;
}
