const express = require('express');
const port = 8000;
const app = express();

app.set('view engine','ejs');

const db = require('./config/db');

const path = require('path');

app.use('/',express.static(path.join(__dirname,'public')))

app.use(express.urlencoded());

const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(session({
    name : 'adminPanel',
    secret : 'PR8',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 24 * 60 * 60 * 1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)

app.use(cookieParser());
                           
app.use('/',require('./routes/indexroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
})