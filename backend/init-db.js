const fs = require('fs');
const path = require('path');
const connection = require('./db');

const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();

connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log('Database initialized');
    connection.end();
});