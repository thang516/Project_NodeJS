const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const { query } = require('express-validator');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const paginate = require('express-paginate');
db.connect();
const handlebars = require('express-handlebars');
const cors = require('cors');
const session = require('express-session');
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));


app.use(paginate.middleware(10, 50));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(
    express.urlencoded({
        extended: true,
        foo: function () {
            return 'FOO!'
        },
        bar: function () {
            return 'BAR';
        }
    }),
);
app.use(cookieParser());
app.use(express.json());




// HTTP logger
app.use(morgan('combined'));
// Template engine
app.engine(
    'handlebars',
    handlebars.engine({
        extname: '.handlebars',
        helpers : {
            sum : (a,b) => a + b
        }

    }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource/views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(` app listening on port ${port}`);
});
