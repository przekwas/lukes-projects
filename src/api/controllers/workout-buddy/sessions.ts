import { workoutBuddy } from '../../../db';
import type { Request, Response, NextFunction } from 'express';

async function getLastFiveForUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const user_id = req.payload.id as string;
		const result = await workoutBuddy.sessions.getLastFiveForUser(user_id);
		res.json({ status: 'success', message: 'Sessions select successful', result });
	} catch (error) {
		next(error);
	}
}

async function addForUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { ...req.body };
		dto.user_id = req.payload.id;
		const result = await workoutBuddy.sessions.insertForUser(dto);
		res.json({
			status: 'success',
			message: 'Session insert successful',
			id: result.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

async function editOneForUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { ...req.body, id: req.params.id, user_id: req.payload.id };
		const result = await workoutBuddy.sessions.editOneForUser(dto);
		res.json({
			status: 'success',
			message: `Session edit successful`,
			id: dto.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

async function destroyOneForUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = {
			id: req.params.id,
			user_id: req.payload.id as string
		};
		const result = await workoutBuddy.sessions.destroyOneForUser(dto);
		res.json({
			status: 'success',
			message: `Session delete successful`,
			id: dto.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

export {
	getLastFiveForUserController,
	addForUserController,
	editOneForUserController,
	destroyOneForUserController
};
