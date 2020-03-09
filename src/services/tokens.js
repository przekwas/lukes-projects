class TokensService {
	constructor(logger, tokenModel) {
		this.logger = logger;
		this.tokenModel = tokenModel;
    }

    async matchPayloadToken(id, userid, token) {
        try {
            this.logger.silly('Matching dat token');
            const match = await this.tokenModel.match(id, userid, token);
            if (match) {
                return { userid: match.userid };
            } else {
                throw new Error('JWT DB match failed');
            }
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
    }
}

module.exports = TokensService;