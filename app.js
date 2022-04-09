/** @format */

const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
require('dotenv').config()
const cors = require('cors')

const MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil
const UserController = require('./modules/user/user.module')().UserController
const ProfileController = require('./modules/profile/profile.module')()
    .ProfileController
const AccommodationController = require('./modules/accommodation/accommodation.controller')

const path = require('path')
const app = express()

app.use(logger('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//establish connection to MongoDB
MongoDBUtil.init()
const redis = require('ioredis')

const credentials = {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    url: `${this.host}:${this.port}`,
}
const redisClient = redis.createClient(credentials)
redisClient.on('connect', () => {
    console.log('connected to redis successfully!')
})

redisClient.set('mykey', 'blaaaa')
redisClient.set('mykey2', 'blaaaa2')
// Or ioredis returns a promise if the last argument isn't a function
redisClient.get('mykey').then((result) => {
    console.log(result) // Prints "value"
})

redisClient.on('error', (error) => {
    console.log('Redis connection error :', error)
})

app.use('/api/', cors())
app.use('/api/users', UserController)
app.use('/api/profile', ProfileController)
app.use('/api/accommodation', AccommodationController)

app.get('/', (req, res) => {
    const pkg = require(path.join(__dirname, 'package.json'))
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up',
    })
})

app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    //provide error only in development
    const error = req.app.get('env') === 'development' ? err : {}
    //set status header
    res.status(err.status || 500)
    //render error page
    res.json({
        error: error.message,
    })
})

module.exports = app
