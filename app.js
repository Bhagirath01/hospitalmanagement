const express = require('express'),
    app = express(),
    // mongoose              =  require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Hospital = require("./models/hospital");
flash = require("connect-flash");
cookieParser = require("cookie-parser");
auth = require("./middleware/auth.js");
const mongoose = require('mongoose');
port = process.env.PORT || 3000;
//Connecting database
// mongoose.connect("mongodb://localhost/auth_demo");
mongoose.connect(`mongodb+srv://User1234:User1234@hospitalmanagement.vsur7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useUnifiedTopology: true });
// mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@exclusive-shard-00-00.p8zm9.mongodb.net:27017,exclusive-shard-00-01.p8zm9.mongodb.net:27017,exclusive-shard-00-02.p8zm9.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dzxvtg-shard-0&authSource=admin&retryWrites=true&w=majority`,{
//     useUnifiedTopology: true
// });
// const mongoose = require('./config/db.js');

global.assestPath = 'http://localhost:3000/public';

// app.use(cors())

app.use(cookieParser('NotSoSecret'));
app.use(require("express-session")({
    secret: "Any normal Word", //decode or encode session
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
passport.use(Hospital.createStrategy());

app.use(express.static(__dirname + '/public'));



passport.serializeUser(Hospital.serializeUser()); //session encoding
passport.deserializeUser(Hospital.deserializeUser()); //session decoding
// passport.use(new LocalStrategy(User.authenticate()));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
    // app.use(auth.initialize());

app.use(passport.initialize());
app.use(passport.session());
//=======================
//      R O U T E S
//=======================

// var apiRouter = require('./routes/admin');
// app.use('/admin', apiRouter);

var apiRouter = require('./routes/api');
app.use('/api', apiRouter);

//Listen On Server
app.listen(process.env.PORT || 3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server Started At Port ${port}`);
    }
});