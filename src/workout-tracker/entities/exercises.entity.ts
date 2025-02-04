import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'exercises' })
export class Exercise {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	/**
	 * The name of the exercise
	 */
	@Column({ length: 100 })
	name: string;

	/**
	 * Optional: equipment e.g. barbell, dumbbell, bodyweight
	 */
	@Column({ nullable: true, length: 100 })
	equipment?: string;

	/**
	 * An optinal tag for exercise e.g. Push, Pull, Leg, Other
	 */
	@Column({ nullable: true, length: 50 })
	tag?: string;

	@Column({ name: 'created_at' })
	createdAt: Date;

	@Column({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'deleted_at', nullable: true })
	deletedAt: Date | null;
}
