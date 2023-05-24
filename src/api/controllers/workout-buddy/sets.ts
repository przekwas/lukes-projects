import { workoutBuddy } from '../../../db';
import type { Request, Response, NextFunction } from 'express';

async function getAllForUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user_id = req.payload.id as string;
		const result = await workoutBuddy.sets.getAllForUser(user_id);
		res.json({ status: 'success', message: 'Sets select successful', result });
	} catch (error) {
		next(error);
	}
}

async function getAllForUserSession(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { user_id: req.payload.id as string, session_id: req.params.sessionid };
		const result = await workoutBuddy.sets.getAllForUserAndSession(dto);
		res.json({ status: 'success', message: 'Sets select successful', result });
	} catch (error) {
		next(error);
	}
}

async function addOneForUser(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { ...req.body, user_id: req.payload.id };
		const result = await workoutBuddy.sets.insertForUser(dto);
		res.json({
			status: 'success',
			message: 'Sets insert successful',
			id: result.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

async function editOneForUser(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { ...req.body, id: req.params.sessionid, user_id: req.payload.id };
		const result = await workoutBuddy.sets.editOneForUser(dto);
		res.json({
			status: 'success',
			message: `Set edit successful`,
			id: dto.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

async function destroyOneForUser(req: Request, res: Response, next: NextFunction) {
	try {
		const dto = { user_id: req.payload.id as string, id: req.params.sessionid };
		const result = await workoutBuddy.sets.destroyOneForUser(dto);
		res.json({
			status: 'success',
			message: `Set delete successful`,
			id: dto.id,
			affectedRows: result.affectedRows
		});
	} catch (error) {
		next(error);
	}
}

export { getAllForUser, getAllForUserSession, addOneForUser, editOneForUser, destroyOneForUser };
