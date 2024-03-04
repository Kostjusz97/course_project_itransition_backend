require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./src/routes');
const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(router);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen( process.env.PORT || 4444, () => {
            console.log('Server start');
        })
    } catch (e) {
        console.log(e)
    }
}

start();
