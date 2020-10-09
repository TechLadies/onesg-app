/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
// Built-in modules
const http = require('http')
const https = require('https')

// Third-party modules
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const morgan = require('morgan')

// Custom modules
const { SERVER_CONFIG, CORS_CONFIG } = require('./config/env')
const routes = require('./routers')

/**
 * Express server setup
 */
const app = express()
const server = SERVER_CONFIG.USE_HTTPS
  ? https.createServer(SERVER_CONFIG.HTTPS_OPTIONS, app)
  : http.createServer(app)

// TODO: add handler to force HTTPS redirects for unsecure connection requests if USE_HTTPS is true

/**
 * Middleware setup
 */
// CORS
const corsOptions = {
  origin: CORS_CONFIG.ALLOWED_ORIGINS,
  methods: CORS_CONFIG.ALLOWED_METHODS,
}

app.use(cors(corsOptions))

app.use(express.json())

// Body Parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// Logger
app.use(
  morgan('combined', {
    skip(req, res) {
      return res.statusCode < 400
    },
    stream: process.stderr,
  })
)

app.use(
  morgan('combined', {
    skip(req, res) {
      return res.statusCode >= 400
    },
    stream: process.stdout,
  })
)

/**
 * Routes setup
 */
routes(app)

/**
 * Start listening to connection requests made on specified PORT
 */
server.listen(SERVER_CONFIG.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `OneSG API Server listening at http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`
  )
})

module.exports = app
