require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routes');
const sequelize = require('./db');
const models = require('./models/models');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://course-project-itransition-frontend-omega.vercel.app"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
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
