const express = require('express');
const cookieParser = require('cookie-parser');
const authenticateMiddleware = require('../Online-Event-Ticketing-System/Middleware/authenticateMiddleware'); 

const app = express();
app.use(cookieParser());
