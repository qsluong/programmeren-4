/**
 * Created by quocsyluong on 18-05-17.
 */

var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

app.get('/about', function(request, response) {
    response.send('Geschreven door Quocsy');
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

app.listen(3000, function() {
    console.log('Server app is listening on post 3000');
})