/**
 * Created by quocsyluong on 01-06-17.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host        :   'localhost',
    user        :   '< MySQL username >',
    password    :   '< MySQL password >',
    database    :   'world'
});

connection.connect();

connection.query('SELECT * from city',
    function(error, rows, fields) {
    if(error)
        console.log('' + error);
    else
        console.dir(rows);
    });

connection.end();