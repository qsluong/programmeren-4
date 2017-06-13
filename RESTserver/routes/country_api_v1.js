/**
 * Created by quocsyluong on 07-06-17.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/countries', function(request, response) {
    response.contentType('application/json');

    db.query('SELECT * FROM country', function(error, rows, fields) {
        if(error) {
            response.status(400).json(error);
        } else {
            response.status(200).json(rows);
        };
    });
});

router.get('/countries/:id', function(request, response){

    var countryId = request.params.id;

    response.contentType('application/json');

    db.query('SELECT * FROM country',
        function(error, rows, fields) {
            if(error) {
                response.status(400).json(error);
            } else {
                response.status(200).json(rows[countryId]);
            };
    });
});

router.post('/countries', function(req, res) {

    var country = req.body;
    var query = {
        sql: 'INSERT INTO `country`(Code, Name, Continent, Region, SurfaceArea, Population, LocalName, GovernmentForm, Code2) VALUES (?, ?, ?, ?, ?, ? ,?, ? , ?)',
        values: [country.Code, country.Name, country.Continent, country.Region, country.SurfaceArea, country.Population, country.LocalName, country.GovernmentForm, country.Code2],
        timeout: 2000
    };

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
                Message: "Succeeded"
            });
        }
    });
});

// QUERY
// INSERT INTO `country`(`Code`, `Name`, `Continent`, `Region`, `SurfaceArea`, `IndepYear`, `Population`, `LifeExpectancy`, `GNP`, `GNPOld`, `LocalName`, `GovernmentForm`, `HeadOfState`, `Capital`, `Code2`) VALUES ("NSA", "NSAbobo","Europe", "Ergens", "213", "1920", "123", "758", "450", "Napu", "Nono", "Beatriks", "Masdk","80","NS")

// Werkende JSON object via POSTMAN
// {
//     "Code": "MLX",
//     "Name": "MLXbobo",
//     "Continent": "Europe",
//     "Region": "Ergens",
//     "SurfaceArea": 210.22,
//     "Population": 12930129,
//     "LocalName": "Abubu",
//     "GovernmentForm": "Nono",
//     "Code2": "MX"
// }

router.get('/cities/search', function(req, res) {
    var type = req.params.type;
    var countryCode = req.query.countrycode;
    var limit = req.query.limit;

    console.dir(type, countryCode, limit);
});

module.exports = router;