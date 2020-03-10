class DungeonNotesService {
	constructor(logger, dungeonNotesModel) {
		this.logger = logger;
		this.dungeonNotesModel = dungeonNotesModel;
	}

	async getNotesForUser(userid) {
		try {
			this.logger.silly(`Getting notes for user ${userid}`);
			const notes = await this.dungeonNotesModel.get(userid);
			return notes;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async getNoteForUser(id, userid) {
		try {
			this.logger.silly(`Getting note ${id} for user ${userid}`);
			const note = await this.dungeonNotesModel.getOne(id, userid);
			return note;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async addNote(note) {
		try {
			this.logger.silly('Adding a new dungeon note');
			const id = await this.dungeonNotesModel.insert(note);
			return id;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async editNote(note) {
		try {
			this.logger.silly(`Editing dungeon note ${note.id}`);
			const result = await this.dungeonNotesModel.edit(note);
			if (result) {
				return note.id;
			} else {
				throw new Error('Something went wrong editing');
			}
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async deleteNote(id, userid) {
		try {
			this.logger.silly(`Deleting dungeon note ${id}`);
			const result = await this.dungeonNotesModel.delete(id, userid);
			if (result) {
				return id;
			} else {
				throw new Error('Something went wrong deleting');
			}
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}

module.exports = DungeonNotesService;
