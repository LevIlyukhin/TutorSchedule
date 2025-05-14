const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('w3s-dynamic-storage/database.db');

//document.getElementById("hl").innerHTML = "module connected";
console.log("opened db");

/*

let sql = "SELECT id myID, day myDay, start myStart, end myEnd, name myName, type myType, comment myComment FROM events";

db.all(sql, [], (err, rows) => {
  if (err) {
    console.log("error in db.all");
   console.error(err.message);
  }
  rows.forEach((row) => {
  console.log(row);
  })
})


let delete_query = "DELETE FROM events WHERE id=7"

db.run(delete_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("entry deleted")
    });


db.close()

let my_query = "CREATE TABLE events (id INTEGER NOT NULL PRIMARY KEY, day INTEGER, name TEXT, start TEXT, end TEXT, type TEXT, comment TEXT);";


 db.run(my_query, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("table created");
    });
 
let my_query1 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (3, "Ксюша", "16:30", "18:30", "offline", "");';

let my_query2 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (1, "Маша", "19:00", "21:00", "offline", "6 мая");';
let my_query3 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (3, "Маша", "19:00", "21:00", "offline", "8 мая");';
let my_query4 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (1, "Саша", "14:30", "15:30", "online", "");';
let my_query5 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (2, "Вождение", "14:00", "16:00", "offline", "7 мая");';
*/

let my_query6 = 'INSERT INTO events (day, name, start, end, type, comment) VALUES ';

my_query6 += '(1, "Школа", "14:55", "16:30", "online", ""), ';
my_query6 += '(1, "Ксюша", "17:30", "19:30", "online", ""), ';

my_query6 += '(2, "Английский", "10:45", "12:10", "offline", ""), ';
my_query6 += '(2, "Дифуры семинар", "13:55", "15:20", "offline", "512 ГК"), ';
my_query6 += '(2, "РТ лекция", "15:30", "16:55", "offline", "239 Квант"), ';
my_query6 += '(2, "Введение в специальность", "17:05", "18:30", "offline", "239 Квант"), ';
my_query6 += '(2, "Шахматы", "20:00", "22:00", "offline", ""), ';

my_query6 += '(3, "Микроконтроллеры лекция", "10:45", "12:10", "offline", "239 Квант"), ';
my_query6 += '(3, "Соня", "19:00", "20:00", "online", ""), ';
my_query6 += '(3, "Информатика", "13:55", "16:55", "offline", "804 КПМ"), ';
my_query6 += '(3, "Анмех семинар", "17:05", "18:30", "offline", "516а ГК"), ';

my_query6 += '(4, "Семен", "15:15", "17:15", "online", ""), ';
my_query6 += '(4, "Английский", "9:00", "10:25", "offline", ""), ';
my_query6 += '(4, "РТ лаба", "17:50", "20:00", "offline", ""), ';

my_query6 += '(5, "Семен", "17:30", "19:30", "online", ""), ';
my_query6 += '(5, "Матан семинар", "15:30", "16:55", "offline", "419 ГК"), ';
my_query6 += '(5, "Шахматы", "20:00", "22:00", "offline", ""), '
my_query6 += '(5, "Мафия😘", "22:00", "23:59", "offline", "428 ГК"), '

my_query6 += '(6, "Физика практикум", "9:00", "12:10", "offline", ""), ';
my_query6 += '(6, "Физика семинар", "13:55", "15:20", "offline", "Цифра 2.36"), ';

my_query6 += '(7, "Саша", "15:00", "16:30", "online", ""), ';
my_query6 += '(7, "Соня", "16:30", "18:00", "online", ""); ';

//my_query6 = 'DELETE FROM events;';

db.run(my_query6, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

/*
db.run(my_query2, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

db.run(my_query3, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

db.run(my_query4, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

db.run(my_query5, [], function(err) {
    if (err) {
     return console.log(err.message);
    }
    });

db.run(my_query6, [], function(err) {
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
*/

db.close();

console.log("closed");