import ajvErrors from 'ajv-errors';

import { createServer } from './server';

const start = async () => {
  const fastify = await createServer({
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [ajvErrors],
    },
    logger: true,
  });

  try {
    await fastify.listen({
      host: fastify.config.HOST,
      port: fastify.config.PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
