const enviroment = process.env.ENVIROMENT;
const isProduction = enviroment === "production";
const MONGO_DB_URI_PRODUCTION = process.env.MONGO_DB_URI_PRODUCTION;
const MONGO_DB_URI_DEVELOPMENT = process.env.MONGO_DB_URI_DEVELOPMENT;
const BASE_HOST = process.env.BASE_HOST;
const REPLICATE_API_TOKEN = "r8_TYsQ2G0j7YSOn8D7QKKRTNsen7F14Zd2M4oKE";
const MONGO_URI = isProduction
  ? MONGO_DB_URI_PRODUCTION
  : MONGO_DB_URI_DEVELOPMENT;
  

export { enviroment, isProduction, BASE_HOST, MONGO_URI, REPLICATE_API_TOKEN };
