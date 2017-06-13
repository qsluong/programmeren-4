/**
 * Created by quocsyluong on 07-06-17.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Bodyparser zorgt dat we de body uit een request kunnen gebruiken,
// de inhoud van een POST request zit hierin
router.use(bodyParser.urlencoded({'extended':'true'}));
router.use(bodyParser.json());
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.get('/cities', function(request, response) {
    var query = 'SELECT * FROM city';

    console.log("De query is " + query);

    response.contentType('application/json');

    db.query(query, function(error, rows, fields) {
        if(error) {
            response.status(400).json(error);
        } else {
            response.status(200).json(rows);
        };
    });
});

router.get('/cities/:id', function(request, response) {
    var cityId = request.params.id;
    response.contentType('application/json');

    var queryGetCityId = "SELECT * FROM city WHERE id=?";

    console.log('De query is ' + queryGetCityId + ' ' + '"' + cityId + '"');

    db.query(queryGetCityId, [cityId],
        function(error, rows, fields) {
            if(error) {
                response.status(400).json(error);
            } else {
                response.status(200).json(rows);
            };
        });
});

router.post('/cities', function(req, res) {

    var city = req.body;
    var query = {
        sql: 'INSERT INTO `city`(Name, CountryCode, District, Population) VALUES (?, ?, ?, ?)',
        values: [city.Name, city.CountryCode, city.District, city.Population ],
        timeout: 2000
    };

    console.log('De query is ' + query.sql + query.values);


    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if(error) {
            res.status(400);
            res.json(error
                // {
                // Message: "Error"
            // }
            )
        } else {
            res.status(200);
            res.json({
                Message: "Succeeded"
            })
        }
    });
});

router.put('/cities/:id', function(req, res) {

    var city = req.body;
    var cityId = req.params.id;
    var query = {
        sql: 'UPDATE `city` SET Name=?, CountryCode=?, District=?, Population=? WHERE ID=?',
        values: [city.Name, city.CountryCode, city.District, city.Population, cityId],
        timeout: 2000
    };

    console.dir(city);
    console.log("De query is " + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if(error) {
            res.status(400);
            res.json({
                Message: 'Error'
            })
        } else {
            res.status(200);
            res.json({
                Message: 'Succeeded'
            })
        };
    });
});

// Werkende JSON object voor Postman
// {
//     "Name": "Drachten",
//     "CountryCode": "NLD",
//     "District": "Fryslan",
//     "Population": 52000
// }

router.delete('/cities/:id', function(req, res) {

    var cityId = req.params.id;
    var query = {
        sql: 'DELETE FROM `city` WHERE ID=?',
        values: [cityId],
        timeout: 2000
    };

    console.log("De query is " + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if(error) {
            res.status(400);
            res.json({
                Message: "Error"
            })
        } else {
            res.status(200);
            res.json({
                Message: "Succeeded"
            })
        };
    });
});
// api/v1/search?type=city&countrycode=XYZ&limit=24

router.get('/search', function(req, res) {
    var type = req.query.type;
    var countryCode = req.query.countrycode;
    var limit = req.query.limit;

    console.log('Dit zijn de parameters: '  + '\n'
        + type + '\n'
        + countryCode + '\n'
        + limit
    );

    var querySet = {
        sql: 'SELECT * FROM ' + '`' + type + '` WHERE CountryCode=? LIMIT ' + limit,
        values: [countryCode]
    };

    console.log('Dit is de query: ' + querySet.sql + ' ' + querySet.values);

    res.contentType('application/json');
    db.query(querySet, function(error, rows, fields) {
        if(error) {
            res.status(400);
            res.json({
                Message: 'Error'
            })
        } else {
            res.status(200);
            res.json(rows)
        }
    });
});

module.exports = router;