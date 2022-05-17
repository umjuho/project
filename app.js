const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

const mainRouter = require('./routes/post');
const aboutRouter = require('./routes/index');
const listRouter = require('./routes/list');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/', mainRouter);
app.use('/userList', listRouter);
app.use('/uploads', aboutRouter);

app.use((req, res, next)=>{
    res.status(404).send('Not Found');
})

app.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기');
})
