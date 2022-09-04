import dotenv from 'dotenv';

import { getEnv } from './lib/env';
import { createServer } from './server';

dotenv.config();

const start = async () => {
  const fastify = await createServer();

  try {
    await fastify.listen({
      host: getEnv('HOST'),
      port: parseInt(getEnv('PORT')),
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
