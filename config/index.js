const enviroment = process.env.ENVIROMENT;
const isProduction = enviroment === "production";
const MONGO_DB_URI_PRODUCTION = process.env.MONGO_DB_URI_PRODUCTION;
const MONGO_DB_URI_DEVELOPMENT = process.env.MONGO_DB_URI_DEVELOPMENT;
const BASE_HOST = process.env.BASE_HOST;

const MONGO_URI = isProduction
  ? MONGO_DB_URI_PRODUCTION
  : MONGO_DB_URI_DEVELOPMENT;

export { enviroment, isProduction, BASE_HOST, MONGO_URI };
