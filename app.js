const express = require('express');
const cookieParser = require('cookie-parser');
const models = require('./models/index.js');
const config = require('./routes/config');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/main/index'));
app.use('/user', require('./routes/user/index'));
app.use('/post', require('./routes/post/index'));

app.set('jwt-secret', config.secret);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

models.sequelize
    .sync()
    .then(() => {
        console.log(' DB 연결 성공');
    })
    .catch((err) => {
        console.log('연결 실패');
        console.log(err);
    });

app.listen(5000, (req, res) => {
    console.log('start');
});
