import 'module-alias/register';
import express from 'express';
import config from '@config';
import logger from '@logger';

async function startServer() {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    
        logger.info(`
        ######################################
        ❤️  Server listening on port: ${config.port} ❤️ 
        ######################################
      `)
    });
}

startServer();