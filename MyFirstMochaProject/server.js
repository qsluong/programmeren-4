/**
 * Created by quocsyluong on 18-05-17.
 */

var express = require('express');
var config = require('./config.json');
var app = express();

// De port zetten via config.json bestand
app.set('PORT', config.webPort);

// Hier wordt de port van de config.json gebruikt
var port = process.env.PORT || app.get('PORT');

server.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
})

server.use('/api/v1', require('./routes/routes_api_v1'));

app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

app.get('/about', function(request, response) {
    response.send('Geschreven door Quocsy');
})

// JSON formaat ophalen met request
app.get('/json', function(request, response) { response.json({
    'some_name': 'Value', 'an_array_of_objects': [
        {
            'another_name': 'Another value', 'a_further_name': "A further value"
        },
        {'yet_another_name': 'Yet another value'} ],
    'some_boolean': true, 'some_integer': 42, 'array_of_ints': [
        2, 3, 5, 7, 11, 13
    ],
    'array_of_strings': [
        "twee", "drie", "vijf", "zeven"
    ] })
})

// Opdracht 1.2e
// app.get('*', function(request, response) {
//     response.status(404);
//     response.send('404 - Not found');
// })

app.post('/', function(request, response) {
    response.send('Hello Avans, POST request received');
})

app.put('/', function(request, response) {
    response.send('Hello Avans, PUT request received');
})

// Opdracht 1.2g
// Als dit stuk bovenaan alle app.get staat dan worden de errors teruggeven
app.all('*', function(request, response) {
    response.status(404);
    response.send('404 - Not found');
})

app.listen(port, function() {
    console.log('The magic happens at http://localhost:' + port);
})