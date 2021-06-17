require('dotenv').config();
const { env } = process;

const config = {
  env: env.NODE_ENV || 'development',
};

const devConfig = {
  dbUser: env.DB_USER_DEV,
  dbPassword: env.DB_PASSWORD_DEV,
  dbName: env.DB_NAME_DEV,
  lastFmKey: env.LASTFM_KEY_DEV,
  jwtKey: env.JWT_KEY_DEV,
  frontendOrigin: env.FRONTEND_ORIGIN_DEV,
};

const prodConfig = {
  dbUser: env.DB_USER_PROD,
  dbPassword: env.DB_PASSWORD_PROD,
  dbName: env.DB_NAME_PROD,
  lastFmKey: env.LASTFM_KEY_PROD,
  jwtKey: env.JWT_KEY_PROD,
  frontendOrigin: env.FRONTEND_ORIGIN_PROD,
};

const currentConfig = config.env === 'production' ? prodConfig : devConfig;
console.log('CURRENT ENV SETUP:', config.env);
console.log(currentConfig);

module.exports = Object.assign({}, config, currentConfig);
