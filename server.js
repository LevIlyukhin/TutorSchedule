console.log("server.js started"); 

require('dotenv').config({ path: './w3s-dynamic-storage/.env' });
console.log("express");
const express = require('express');
console.log("path"); 
const path = require('path');
console.log("fs"); 
const fs = require('fs');
console.log("sqlite3"); 
const sqlite3 = require('sqlite3');
console.log("cors"); 
const cors = require('cors');
console.log("child_process"); 
const {spawn} = require('child_process');
console.log("server.js started"); 

console.log('server opened');  

const child = spawn('node', ['db_script.js']);

let eventString;
let myEvent
let eventInfo = []; 
let eventInfoIds = [];

child.stdout.on('data', (data) => {
    eventString = `${data}`;
    eventString = eventString.split('[');
    let i = 2;
    let j = 0;
    while ((i < eventString.length && eventString[i].split(',')).length >= 6){
      eventInfo.push([]);
	  eventInfoIds.push([]);
      myEvent = eventString[i].replace(/\[|\]/g, '').split(',');
      j = 0;
      while(j < 6){
        eventInfo[i - 2].push('');
        eventInfo[i - 2][j] = myEvent[j + 1].replace(/\'/g, '').trim();
        j += 1;
      }
	  j = 0;
      while(j < 7){
        eventInfoIds[i - 2].push('');
        eventInfoIds[i - 2][j] = myEvent[j].replace(/\'/g, '').trim();
        j += 1;
      }
      i += 1;
    } 

}); 

child.stderr.on('data', (data) => {
    console.log(`Error: ${data}`);
}); 

child.on('close', (code) => {
	//console.log(eventInfoIds);
    console.log(`Executed db_script with code: ${code}`);
});
//import {myArr} from 'public/scripts/db_scripts.js';
//console.log(myArr);

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// App
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token"
  );
  res.header('Access-Control-Allow-Methods', "GET, OPTIONS, POST, DELETE, PUT, PATCH");
  //res.header('Content-Type', 'application/json');
  res.header('xxx', 'true');

  next();
})

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/text', (req, res) => {
  res.status(200).json({mytext: [[1, 2, 3], ['a', 'b', 'c'], [5, 6, 7]]});
});

app.use(express.static(path.join(__dirname, 'public')));
app.get("/table", (req, res) =>{
  res.status(200).json({myData: eventInfo, mystr: eventString});
})

app.get('/test', (req, res) => {
  res.send("this is a test page");
})

app.get('/event_list', (req, res) => {
	console.log('sending event list');
	res.status(200).json({myList: eventInfoIds});
})

app.post('/submit_new_event', (req, res) => {
  console.log('submitted event:');
  let valid = check_event_validity(req.body);
  if (valid == 0) {
      add_new_event(req);
      res.redirect('/'); 
  }
  else {
      res.send('an error occured!' + valid);
  }
})

app.post('/delete_event', (req, res) => {
	console.log(req.body);
	res.redirect('/');
	delete_event_by_id(req.body.id); 
})

function delete_event_by_id(id) {
	let db = new sqlite3.Database('w3s-dynamic-storage/database.db');
	console.log("opened db");
	let my_query = 'DELETE FROM events WHERE id=' + id + ';';
	console.log(my_query);
	db.run(my_query, [], function(err) {
    	if (err) {
     	return console.log(err.message);
    	}
    });
	db.close();
	console.log("closed"); 
	renew_list();
}

function renew_list(){
	const child = spawn('node', ['db_script.js']);
	eventInfo = [];
	eventInfoIds = [];

	child.stdout.on('data', (data) => {
		eventString = `${data}`;
		eventString = eventString.split('[');
		let i = 2;
		let j = 0;
		while ((i < eventString.length && eventString[i].split(',')).length >= 6){
			eventInfo.push([]);
			eventInfoIds.push([]);
			myEvent = eventString[i].replace(/\[|\]/g, '').split(',');
			j = 0; 
			while(j < 6){
				eventInfo[i - 2].push('');
				eventInfo[i - 2][j] = myEvent[j + 1].replace(/\'/g, '').trim();
				j += 1;
			}
			j = 0;
			while(j < 7){
				eventInfoIds[i - 2].push('');
				eventInfoIds[i - 2][j] = myEvent[j].replace(/\'/g, '').trim();
				j += 1;
			}
      		i += 1;
    	}
		console.log('renew list');
	});

	child.stderr.on('data', (data) => {
    	console.log(`Error: ${data}`);
	});

	child.on('close', (code) => {
    	console.log(`Executed db_script with code: ${code}`);
	});
}

function add_new_event(req) {
  console.log("adding_event");
  let db = new sqlite3.Database('w3s-dynamic-storage/database.db');
  console.log("opened db");
  let end = req.body.time_help_end;
  let my_query = 'INSERT INTO events (day, name, start, end, type, comment) VALUES (';
  my_query += req.body.day + ', "' + req.body.name + '", "' + req.body.time_help_st + '", "' + end + '", "offline", "' + req.body.comment + '");';
  console.log(my_query);
  db.run(my_query, [], function(err) {
    if (err) {
     return console.log(err.message); 
    }
    });
  db.close();
  console.log("closed"); 

  renew_list();
}

function isValidTime(x){
	x = x.trim();
	let a = x.split(":");
	if (a.length != 2) {
		return false;
	}
	for (let i in a) {
		if (isNaN(i)) {
			return false;
		}
	}
	if (!((0 <= a[0]) && (23 >= a[0]))) {
		return false;
	}
	if (!((0 <= a[1]) && (59 >= a[1]))) {
		return false;
	}
	return true;
}


function time_to_id(x){
	let times = x.split(":");
	return "1_" + Number(times[0])+ "_" + Number(times[1]);
}


function compare_time(one, two){
	one = one.trim();
	two = two.trim();
	if (!(isValidTime(one) && isValidTime(two))) {
		return 42;
	}
	let x = one.split(":");
	let y = two.split(":");
	x[0] = Number(x[0]);
	x[1] = Number(x[1]);
	y[0] = Number(y[0]);
	y[1] = Number(y[1]);
	if (x[0] > y[0]){
		return 1;
	}
	if (x[0] < y[0]){
		return -1;
	}
	if (x[1] > y[1]){
		return 1;
	}
	if (x[1] < y[1]){
		return -1;
	}
	return 0;
}


function next_id(x) {
	let b = x.split("_");
	if (b[2] == "0") {
		b[2] = "30"
		return b.join("_");
	} 
	b[1] = Number(b[1]) + 1;
	b[2] = "0";
	return b.join("_");
}


function next_time(x) {
	let u = x.split(":");
	if (u[1] == "00") {
		u[1] = "30"
		return u.join(":");
	} 
	u[0] = Number(u[0]) + 1;
	u[1] = "00";
	return u.join(":");
}


function id_to_time(x){
	let c = x.split("_");
	if (c[2] == "0"){
		c[2] = "00";
	}
	return c[1] + ":" + c[2];
}


function round_time(x){
	let d = x.split(":");
	if (d[1] < 15) {
			return d[0] + ":00";
		}
		else if (d[1] < 45) {
			return d[0] + ":30";
		}
		else {
			return (Number(d[0]) + 1) + ":00";
		}
}

function time_from_number(h, m){
	if (m < 10) {
		return h + ":0" + m;
	}
	return h + ":" + m;
}

function check_event_validity(body) {
  if (!(["1", "2", "3", "4", "5", "6", "7"].includes(body.day))) {
    return "The day was not specified correctly!";
  }
  if (compare_time(body.time_help_end, body.time_help_st) != 1) {
	return "The times were not specified correctly!";
  }
  return 0; 
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`); 
