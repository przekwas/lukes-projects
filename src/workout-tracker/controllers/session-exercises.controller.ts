import { Controller, Get } from '@nestjs/common';
import { SessionExercisesService } from '../services/session-exercises.service';

@Controller('workout-tracker/session-exercises')
export class SessionExercisesController {
	constructor(private readonly sessionExercisesService: SessionExercisesService) {}

    @Get()
    async getAll() {
        return this.sessionExercisesService.getAll();
    }
}
