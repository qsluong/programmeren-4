var express = require('express');
var router = express.Router();
var path = require('path');

var recipes = [
    {
        name: 'Lasagne',
        category: 'Pasta',
        procedure: 'Steps for making lasagne'
    },
    {
        name: 'Calzone',
        category: 'Pizza',
        procedure: 'Steps to make calzone (pizza)'
    },
    {
        name: 'Tuna Salad',
        category: 'Salad',
        procedure: [
            'Mix ingredients in a bowl',
            'Chill before serving'
        ]
    }
];

module.exports = recipes;