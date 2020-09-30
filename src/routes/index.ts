import { Router } from 'express';
import auth from './auth';
import api from './api';

export default function () {
	const mainRoutes = Router();

	auth(mainRoutes);
	api(mainRoutes);

	return mainRoutes;
}