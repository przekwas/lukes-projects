import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateWorkoutSessionDto {
	/**
	 * If provided, update sessionDate. Should be an ISO string like "2025-02-01T10:00:00Z".
	 */
	@IsOptional()
	@IsDateString()
	sessionDate?: string;

	/**
	 * If provided, update location.
	 */
	@IsOptional()
	@IsString()
	location?: string;

	/**
	 * If provided, update notes.
	 */
	@IsOptional()
	@IsString()
	notes?: string;
}
