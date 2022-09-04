const defaultValues = {
  HOST: '127.0.0.1',
  PORT: '8000',
  SERVER_BASE_URL: 'http://localhost:8000',
  PASSWORD_SALT_OR_ROUNDS: '10',
  SESSION_SECRET: 'FaLo2p4Ngx9EAQFEHpHgneZjlcCK32Yv',
  CORS_ORIGIN: 'http://localhost:3000',
};

export const getEnv = (name: keyof typeof defaultValues) => {
  const value = process.env[name];

  return value || defaultValues[name];
};
