import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutTrackerService {
	private workouts = [
		{ id: 1, name: 'Push Day', exercises: ['Bench Press', 'Shoulder Press'] },
		{ id: 2, name: 'Pull Day', exercises: ['Pull-ups', 'Rows'] }
	];

    findAll() {
        return this.workouts;
    }

    findOne(id: number) {
        return this.workouts.find(workout => workout.id === id);
    }

    create(newWorkout: { name: string, exercises: string[]}) {
        const newId = this.workouts.length + 1;
        const workout = { id: newId, ...newWorkout };
        this.workouts.push(workout);
        return workout;
    }
}
