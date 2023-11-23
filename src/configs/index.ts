import env from 'dotenv';

// env config
env.config();

const configs = {
  port: process.env.PORT || 5000,
  origin: '*',
  uri: process.env.DB_URI!,
} as const;

export default configs;
