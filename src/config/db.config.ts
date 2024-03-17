import * as process from 'process';

export default () => ({
  dbUser: process.env.DATABASE_USER || '',
  dbPassword: process.env.DATABASE_PASSWORD || '',
  dbHost: process.env.DATABASE_HOST || 'localhost',
  dbPort: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  dbName: process.env.DATABASE_NAME || 'location-alarm-api-db',
});
