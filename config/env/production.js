/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Retrieves globals and env variables for the PRODUCTION env from process.env
 * This file will be checked in, DO NOT DEFINE variables here!
 * These variables can be directly defined in HEROKU
 */

// eslint-disable-next-line prefer-destructuring
const NODE_ENV = process.env.NODE_ENV;

const CORS_CONFIG = {
  ALLOWED_ORIGINS:
    'https://onesg-backend-staging.herokuapp.com' /* process.env.ALLOWED_ORIGINS */,
  ALLOWED_METHODS: process.env.ALLOWED_METHODS,
};

// Server Settings
const SERVER_CONFIG = {
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  USE_HTTPS: process.env.USE_HTTPS,
  HTTPS_OPTIONS: process.env.HTTPS_OPTION,
};

module.exports = {
  NODE_ENV,
  CORS_CONFIG,
  SERVER_CONFIG,
};
