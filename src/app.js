const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const captcha = require('./routes/captcha');
const reg = require('./routes/reg');
const login = require('./routes/login');
const notFound = require('./routes/not-found');
const handleError = require('./routes/error');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());

app.use(captcha);
app.use(reg);
app.use(login);

app.use(notFound);
app.use(handleError);

app.listen(8888, () => console.log(`服务器已启动!`));