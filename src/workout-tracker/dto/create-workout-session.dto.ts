import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkoutSessionDto {
	/**
	 * The date/time the workout occurred, in ISO string format
	 * (e.g. "2025-02-01T10:00:00Z").
	 */
	@IsDateString()
	sessionDate: string;

	/**
	 * Optional text for location
	 */
	@IsOptional()
	@IsString()
	location?: string;

	/**
	 * Optional notes about the session (text).
	 */
	@IsOptional()
	@IsString()
	notes?: string;
}
