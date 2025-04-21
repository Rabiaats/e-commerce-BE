"use strict";

const express = require('express');
const app = express();

// gizlemek istedigimiz degiskenler .env dosyasindan aliriz
require('dotenv').config();
const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || '127.0.0.1';

// asenkron hatalari errorHandlerda yakalamak icin
require('express-async-errors');

// database baglantisi
const {dbConnection} = require('./src/configs/dbConnection');
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('cors')());

app.use('/upload', express.static('./upload'))

app.use(require('./src/middlewares/authentication'));

app.use(require('./src/middlewares/logger'));

app.use(require('./src/middlewares/queryHandler'))

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to E-Commerce API',
        documents: {
            swagger: '/documents/swagger',
        },
        user: req.user
    })
});

const session = require('cookie-session')
app.use(session({
    secret: process.env.SECRET_KEY,
    maxAge: 1000*60*60*24*1
}));
app.use(require('./src/middlewares/cartSession'))

app.use(require('./src/routes'))

// NotFound: 
app.all('*', (req, res) => {
    
    res.status(404).send({
        error: true,
        message: 'Route is not found!'
    })
})

app.use(require('./src/middlewares/errorHandler'))

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

/*
// app.listen(PORT, () => console.log(`https://e-commerce-be-v4zj.onrender.com`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
