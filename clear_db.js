const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('w3s-dynamic-storage/database.db');

console.log("opened db");

let my_query6 = 'DELETE FROM events;';

db.run(my_query6, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

db.close();

console.log("closed");