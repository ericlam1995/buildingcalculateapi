var express = require('express'); //import express 
var app = express();
const bodyParser = require('body-parser');
const buildingrouter = require('./route/apiroute');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    next();
});

//to handle HTTP get request
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', buildingrouter);




//start server on port: 8080
var server = app.listen(process.env.PORT || 3000, function () {

    console.log("You are running our web service!")

});

module.exports = app;