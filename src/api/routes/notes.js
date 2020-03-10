const express = require('express');
const logger = require('../../loaders/logger');
const middlewares = require('../middlewares');
const notesModel = require('../../models/dungeons_notes');
const notesService = require('../../services/dungeon_notes');
const router = express.Router();
const notesServiceInstance = new notesService(logger, notesModel);

module.exports = app => {
	app.use('/notes', router);

	router.get('/', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			const userid = req.user.id;
			const notes = await notesServiceInstance.getNotesForUser(userid);
			res.json(notes);
		} catch (error) {
			logger.error('🔥 error: %o', error);
			next(error);
		}
	});

	router.get('/details/:id', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			const id = req.params.id;
			const userid = req.user.id;
			const notes = await notesServiceInstance.getNoteForUser(id, userid);
			res.json(notes);
		} catch (error) {
			logger.error('🔥 error: %o', error);
			next(error);
		}
	});

	router.post('/', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			const notesDTO = req.body;
			const userid = req.user.id;
			const id = await notesServiceInstance.addNote({ ...notesDTO, userid });
			res.json({ noteid: id });
		} catch (error) {
			logger.error('🔥 error: %o', error);
			next(error);
		}
	});

	router.put('/:id', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			const notesDTO = req.body;
			const userid = req.user.id;
			const id = req.params.id;
			const editedId = await notesServiceInstance.editNote({ ...notesDTO, userid, id });
			res.json({ noteid: editedId });
		} catch (error) {
			logger.error('🔥 error: %o', error);
			next(error);
		}
    });
    
    router.delete('/:id', middlewares.hasToken, middlewares.isGuest, async (req, res, next) => {
		try {
			const userid = req.user.id;
			const id = req.params.id;
			const deletedId = await notesServiceInstance.deleteNote(id, userid);
			res.json({ noteid: deletedId });
		} catch (error) {
			logger.error('🔥 error: %o', error);
			next(error);
		}
	});
};
