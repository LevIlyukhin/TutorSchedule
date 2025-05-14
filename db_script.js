//document.getElementById("hl").innerHTML = "db code entered";

const sqlite3 = require('sqlite3');

var arr = [], records = [];

function start_db(){
return new Promise((resolve, reject) => {
let db1 = new sqlite3.Database('w3s-dynamic-storage/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("error in new sqlite3.database");
    throw err;
  }
  resolve(db1);
});
})
}

async function getRecords(db){
  return new Promise((resolve,reject)=>{
  //db = await start_db();
  //console.log("test after db await");
let sql = "SELECT id myid, day myDay, start myStart, end myEnd, name myName, type myType, comment myComment FROM events";
db.all(sql, [], (err, rows) => {
  if (err) {
    console.log("error in db.all");
   console.error(err.message);
  }
  rows.forEach((row) => {
  arr.push([row.myid, (" " + row.myDay).trim(), row.myStart.trim(), row.myEnd.trim(), row.myName.trim(), row.myType.trim(), row.myComment.trim()]);
  })
  db.close();
  resolve(arr);
})
  })
}

async function asyncCall(){
  let db = await start_db();
  arr = await getRecords(db);
  console.log(arr);
}

asyncCall();

/*
let db = new sqlite3.Database('w3s-dynamic-storage/database.db');

//document.getElementById("hl").innerHTML = "module connected";
console.log("opened db");

let delete_query = "DROP TABLE events;"

db.run(delete_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("table deleted")
    });

db.close()

let db2 = new sqlite3.Database('w3s-dynamic-storage/database.db');

let my_query = "CREATE TABLE events (id INTEGER NOT NULL PRIMARY KEY, day INTEGER, name TEXT, start TEXT, end TEXT, type TEXT, comment TEXT);";


 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("table created");
    });
 


let my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (1, "Ксюша", "16:00", "18:00", "offline", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (3, "Ксюша", "16:30", "18:30", "offline", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (6, "Тася", "16:00", "17:00", "online", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (1, "Саша", "14:30", "15:30", "online", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (3, "Саша", "14:30", "15:30", "online", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (4, "Саша", "14:0", "15:00", "online", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (4, "Вождение", "11:30", "13:00", "offline", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    });

my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (6, "Вождение", "11:30", "13:00", "offline", "");';

 db2.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(" db2 modified");
    });


 db2.close();

console.log("closed");
*/

//w3s-dynamic-storage/database.db