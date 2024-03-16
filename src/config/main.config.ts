import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cookiesMaxAge: parseInt(process.env.COOKIES_MAX_AGE, 10) || 2592000000,
});
