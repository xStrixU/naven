import { createServer } from './server';

const start = async () => {
  const fastify = await createServer({ logger: true });

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
