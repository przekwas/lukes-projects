import { db } from '../../../db';
import { TableRouter } from '../../../utils';
import { isAdmin } from '../../../middlewares';

export const hipHopRouter = new TableRouter(db.hiphop, {
	canDelete: isAdmin,
	canEdit: isAdmin,
	canWrite: isAdmin
}).Router;