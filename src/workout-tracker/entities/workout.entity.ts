import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'workouts' })
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  notes?: string;
}