import * as process from 'process';

export default () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET || '',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '',
  refreshSecret: process.env.JWT_REFRESH_SECRET || '',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '',
});
