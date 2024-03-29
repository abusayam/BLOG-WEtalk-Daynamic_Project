const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const config = require('config')
const MongoDBStore = require('connect-mongodb-session')(session)

const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')

// ------ Database connection for authentication ------Start

const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}
@cluster1.ngnf7wq.mongodb.net/?retryWrites=true&w=majority`

// ------ Database connection for authentication ------End

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'mySessions',
    expires: 1000 * 60 * 60 * 24
    
});


// middleware arrays
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
       secret: config.get('secret'),
       resave: false,
       saveUninitialized: false,
       store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),
    
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}