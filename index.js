require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routes');
const sequelize = require('./db');
const models = require('./models/models');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();

const corsOptions = {
  origin: 'https://course-project-itransition-frontend-omega.vercel.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  headers: ["Content-Type", "Authorization", "Origin", "Accept"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);

app.use(errorHandler)

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
