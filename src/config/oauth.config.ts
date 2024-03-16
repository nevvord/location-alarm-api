import * as process from 'process';

export default () => ({
  clientId: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_CLIENTSECRET,
});
