/**
 * Created by quocsyluong on 01-06-17.
 */

// Toevoegen variablen voor toegang tot request body
var express = require('express');
var config = require('./config/config');

var app = express();

app.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
});

// Routing API versions
app.use('/api/v1/', require('./routes/city_api_v1'));
app.use('/api/v1/', require('./routes/country_api_v1'));

app.set('PORT', config.webPort);

var port = process.env.PORT || app.get('PORT');

app.get('/', function(request, response) {
    response.send("De WORLD database van MySQL");
});

app.get('/about', function(request, response) {
    response.send("Door mij");
});

app.all('*', function(request, response) {
    response.status(404);
    response.send('404 - Not found');
});

app.listen(port, function() {
    console.log('Verbonden met database WORLD https://localhost: ' + port);
});

module.exports = app;