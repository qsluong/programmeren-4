/**
 * Created by quocsyluong on 08-06-17.
 */
var mysql = require('mysql');
var config = require('./config');

var connection = mysql.createConnection({
    host        :   process.env.DB_HOST || config.dbHost,
    user        :   process.env.DB_USER || config.dbUser,
    // password    :   '< MySQL password >',
    database    :   process.env.DB_DATABASE || config.dbDatabase
});

connection.connect(function (error) {
    if(error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + config.dbHost + ":" + config.dbDatabase);
    }
});

module.exports = connection;