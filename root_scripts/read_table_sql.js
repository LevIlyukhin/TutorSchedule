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
			return (Number(d[1]) + 1) + ":00";
		}
}

function time_from_number(h, m){
	if (m < 10) {
		return h + ":0" + m;
	}
	return h + ":" + m;
}


function create_event(day, start, end, my_name, form, additional) {
	const myEvent = {name: my_name, validity: true, add: additional, form: form, start_hour: 0, start_min: 0, end_min: 0, end_hour: 0, day: Number(day), ids: [], height: 0};
	if (! isValidTime(start)) {
		myEvent.validity = false;
	}
	else {
		let st;
		st = start.split(":");
		myEvent.start_min = Number(st[1]);
		myEvent.start_hour = Number(st[0]);
	}
	if (! isValidTime(end)) {
		myEvent.validity = false;
	}
	else {
		let en = end.split(":");
		myEvent.end_min = Number(en[1]);
		myEvent.end_hour = Number(en[0]);
	}
	if (myEvent.validity) {
		let start_id = day + "_";
		if (myEvent.start_min < 15) {
			start_id += myEvent.start_hour + "_0";
		}
		else if (myEvent.start_min < 45) {
			start_id += myEvent.start_hour + "_30";
		}
		else {
			start_id += (myEvent.start_hour + 1) + "_0";
		}
		myEvent.ids[0] = start_id;
		let current_id = next_id(start_id);
		while(compare_time(round_time(end), id_to_time(current_id)) == 1){
			myEvent.ids.push(current_id);
			current_id = next_id(current_id);
		}
		myEvent.height = 40 * myEvent.ids.length;
	}
	else{
		myEvent.ids[0] = day + "_nst";
		myEvent.height = 70;
	}
	return myEvent;
}


function modify(myEvent){
    const fs = require('fs');
    fs.appendFile("../public/scripts/buffer_timetable.js", "const element; let result")
	let counter = 0;
    let result = '';
	let elt = 0;
	while (elt < myEvent.ids.length){
		if (counter == 0){
			counter = 1;
		}
		else{
            fs.appendFile("../public/scripts/buffer_timetable.js", 
			"element = document.getElementById(" + myEvent.ids[elt] + "); element.remove(); ")
		}
		elt += 1;
	}
    fs.appendFile( "../public/scripts/buffer_timetable.js", 'document.getElementById(' + myEvent.ids[0] + ').rowSpan = "" + ' + myEvent.ids.length + ';')
	if(myEvent.validity){
        result = 'document.getElementById(' + myEvent.ids[0] + ').innerHTML = \'<div class="my_event" style="cursor: pointer; position: relative; display: inline-block; overflow: auto; line-height: 1; margin-top: 3px; width: 130px; height: ' + myEvent.height + 'px;">' + myEvent.name + "<br>" + '<p class="time">' + time_from_number(myEvent.start_hour, myEvent.start_min) + " - " + time_from_number(myEvent.end_hour, myEvent.end_min) + '</p> <div class="event_comment_' + myEvent.form + '">' + myEvent.add + '</div> </div>\';';
        fs.appendFile("../public/scripts/buffer_timetable.js", result);
	}
	else{
		result = 'document.getElementById(' + myEvent.ids[0] + ').innerHTML = \'<div class="my_event" style="cursor: pointer; position: relative; display: inline-block; overflow: auto; line-height: 1; margin-top: 3px; width: 130px; height: ' + myEvent.height + 'px;"> ' + myEvent.name + '<div class="event_comment_' + myEvent.form + '">' + myEvent.add + '</div> </div>\'';
        fs.appendFile("../public/scripts/buffer_timetable.js", result);
	}
	if (myEvent.form == "online"){
        fs.appendFile("../public/scripts/buffer_timetable.js", 'document.getElementById(' + myEvent.ids[0] + ').className = "online_event";');
	}
	else if (myEvent.form == "offline"){
		fs.appendFile("../public/scripts/buffer_timetable.js", 'document.getElementById(' + myEvent.ids[0] + ').className = "offline_event";');
	}
}

function create_table(first_id, last_id){
	let result = '\'<div> <table style="width:97.5%"> <tr> <th style="width:12.5%"> Время </th>';
	result = result + ' <th style="width:17%"> Понедельник </th>';
	result = result + ' <th style="width:17%"> Вторник </th>';
	result = result + ' <th style="width:17%"> Среда </th>';
	result = result + ' <th style="width:17%"> Четверг </th>';
	result = result + ' <th style="width:17%"> Пятница </th>';
	result = result + ' <th style="width:17%"> Суббота </th> </tr>';
	result = result + ' <tr> <th style="height:70px"> Неопределено </th>';
	result = result + ' <td id="1_nst"></td>';
	result = result + ' <td id="2_nst"></td>';
	result = result + ' <td id="3_nst"></td>';
	result = result + ' <td id="4_nst"></td>';
	result = result + ' <td id="5_nst"></td>';
	result = result + ' <td id="6_nst"></td> </tr>';
	let cur_time = id_to_time(first_id);
	cur_id = first_id.slice(1, first_id.length);
	let it = 1;
	while (compare_time(cur_time, id_to_time(last_id)) <= 0){
		result += '<tr> <th style="height:40px">' + cur_time + " - ";
		cur_time = next_time(cur_time);
		result += cur_time + "</th>"
        it = 1;
		while(it < 7){
			result += '<td id = "' + it + cur_id + '"> </td>';
			it += 1;
		}
		result += "</tr>";
		cur_id = next_id(cur_id);
	}
	result += "</table> </div>'"
	//document.write(result);
	console.log(result);
}


function readDataHTML(){
	const arr = document.getElementById("info").innerHTML.split("$");
	let elem = 0;
	let my_events = [];
	let start_time;
	let end_time;
	if (arr.length > 0){
		start_time = arr[0].split("|")[1].trim();
		end_time = arr[0].split("|")[2].trim();
	}
	else {
		start_time = "9:00";
		end_time = "9:00";
	}
	let myDay = 0;
	let days = [[], [], [], [], [], []];
	let err = false;
	while (elem < arr.length){
		if (arr[elem].trim() != "") {
			arr[elem] = arr[elem].split("|");
			myDay = Number(arr[elem][0]) - 1;
			let i = 0;
			err = false;
			while(i < days[myDay].length && arr[elem][1].trim() != "" && arr[elem][2].trim() != "") {
				if (compare_time(days[myDay][i][0], arr[elem][1].trim()) <= 0 && compare_time(arr[elem][1].trim(), days[myDay][i][1]) < 0){
					err = true;
					document.getElementById("warn").innerHTML = "Your events overlap. This can lead to some events being not displayed. Please correct your scedule.";
					break;
				}
				if(compare_time(days[myDay][i][0], arr[elem][2].trim()) < 0 && compare_time(arr[elem][2].trim(), days[myDay][i][1]) <= 0){
					err = true;
					document.getElementById("warn").innerHTML = "Your events overlap. This can lead to some events being not displayed. Please correct your scedule.";
					break;
				}
				i += 1;
			}
			if (!err) {
				if (arr[elem][1].trim() != "" && arr[elem][2].trim() != ""){
					days[myDay].push([arr[elem][1].trim(), arr[elem][2].trim()]);}
				my_events.push(create_event(arr[elem][0].trim(), arr[elem][1].trim(), arr[elem][2].trim(), arr[elem][3].trim(), arr[elem][4].trim(), arr[elem][5].trim()));
				if (my_events.at(-1).validity){
					if (compare_time(start_time, arr[elem][1].trim()) > 0) {
						start_time = arr[elem][1].trim();
				}
					if (compare_time(next_time(end_time), arr[elem][2].trim()) < 0){	
						end_time = arr[elem][2].trim();
				}
				}
			}
		}
		elem ++;	
	}
	create_table(time_to_id(start_time), time_to_id(end_time));
	elem = 0;
	while(elem < my_events.length){
		modify(my_events[elem]);
		elem ++;
	}

}

function processData(arr){
	let elem = 0;
	let my_events = [];
	let start_time;
	let end_time;
	if (arr.length > 0){
		start_time = arr[0].split("|")[1].trim();
		end_time = arr[0].split("|")[2].trim();
	}
	else {
		start_time = "9:00";
		end_time = "9:00";
	}
	let myDay = 0;
	let days = [[], [], [], [], [], []];
	let err = false;
	while (elem < arr.length){
		if (arr[elem][0].trim() != "") {
			myDay = Number(arr[elem][0]) - 1;
			let i = 0;
			err = false;
			while(i < days[myDay].length && arr[elem][1].trim() != "" && arr[elem][2].trim() != "") {
				if (compare_time(days[myDay][i][0], arr[elem][1].trim()) <= 0 && compare_time(arr[elem][1].trim(), days[myDay][i][1]) < 0){
					err = true;
					document.getElementById("warn").innerHTML = "Your events overlap. This can lead to some events being not displayed. Please correct your scedule.";
					break;
				}
				if(compare_time(days[myDay][i][0], arr[elem][2].trim()) < 0 && compare_time(arr[elem][2].trim(), days[myDay][i][1]) <= 0){
					err = true;
					document.getElementById("warn").innerHTML = "Your events overlap. This can lead to some events being not displayed. Please correct your scedule.";
					break;
				}
				i += 1;
			}
			if (!err) {
				if (arr[elem][1].trim() != "" && arr[elem][2].trim() != ""){
					days[myDay].push([arr[elem][1].trim(), arr[elem][2].trim()]);}
				my_events.push(create_event(arr[elem][0].trim(), arr[elem][1].trim(), arr[elem][2].trim(), arr[elem][3].trim(), arr[elem][4].trim(), arr[elem][5].trim()));
				if (my_events.at(-1).validity){
					if (compare_time(start_time, arr[elem][1].trim()) > 0) {
						start_time = arr[elem][1].trim();
				}
					if (compare_time(next_time(end_time), arr[elem][2].trim()) < 0){	
						end_time = arr[elem][2].trim();
				}
				}
			}
		}
		elem ++;	
	}
	create_table(time_to_id(start_time), time_to_id(end_time));
	elem = 0;
	while(elem < my_events.length){
		modify(my_events[elem]);
		elem ++;
	}
}

var arr = [], records = [];

function readDataSQL(){
	//document.getElementById("hl").innerHTML = "entered f";
	asyncCall();
	processData(arr);
}

function getRecords(){	
  	return new Promise((resolve,reject)=>{
	//document.getElementById("hl").innerHTML = "entered promice";
	sqlite3 = require("sqlite3");
	let db = new sqlite3.Database('../w3s-dynamic-storage/database.db', (err) => {
  if (err) {
    throw err;
  }});
	//document.getElementById("hl").innerHTML = "created dbconnect";
	let sql = "SELECT day myDay, name myName, start myStart, end myEnd, type myType, comment myComment FROM events";
	db.all(sql, [], (err, rows) => {
  		if (err) {
    		throw err;
  	}
  	rows.forEach((row) => { 
	//document.getElementById("hl").innerHTML = row.myName;
  	arr.push([(" " + row.myDay).trim(), row.myName.trim(), row.myStart.trim(), row.myEnd.trim(), row.myType.trim(), row.myComment.trim()]);
  	})
	//document.getElementById("hl").innerHTML = "wrote down";
  	resolve(arr);
	})
	db.close();
  	})
}

async function asyncCall(){
  	//document.getElementById("hl").innerHTML = "entered async";
  	arr = await getRecords();
}

readDataSQL();

