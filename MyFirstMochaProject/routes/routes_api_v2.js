// API version 2
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/info', function (request, response) {
    response.json({
        'Naam': 'Value', 'an_array_of_objects':
            [{
                'another_name': 'Another value', 'a_further_name': "A further value"
            },
            {
                'yet_another_name': 'Yet another value'
            }],
        'some_boolean': "Korte beschrijving"
    })
})

router.get('*', function(request, response) {
    response.status(200);
    response.json({
        "description": "API version 2"
    })
})

router.all('*', function(request, response) {
    response.status(404);
    response.send('404 - Not found');
})

module.exports = router;