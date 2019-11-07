var $ = function (id) { return document.getElementById(id); };

window.onload = function() {
var date = new Date();
var month_name = [‘January’,‘February’,‘March’,‘April’,‘May’,‘June’,‘July’,‘August’,‘September’,‘October’,‘November’,‘December’];
var month = date.getMonth(); //0-11
var year = date.getFullYear(); //2014
var first_date = month_name[month] + " " + 1 + " " + year;
var tmp = new Date(first_date).toDateString();
//Mon Sep 01 2014 …
var first_day = tmp.substring(0, 3); //Mon
var day_name = [‘Mon’,‘Tue’,‘Wed’,‘Thu’,‘Fri’,‘Sat’,‘Sun’];
var day_no = day_name.indexOf(first_day); 
var getLastDayofMonth = new Date(year, month+1, 0).getDate(); //30
//Tue Sep 30 2014 …
var calendar = get_calendar(day_no, getLastDayofMonth); // call the function get_calendar
document.getElementById(“month_year”).innerHTML = month_name[month]+" "+year;
document.getElementById(“calendar”).appendChild(calendar);
}

function get_calendar(day_no, getLastDayofMonth){
var table = $("tbl");
var tBody = table.tBodies[0];
if (tBody == undefined) {
	tBody = document.createElement("tbody");
	table.appendChild(tBody);
}
//rows 0-6 for the day letters
  for(var c=0; c<=6; c++){
      var th = document.createElement('th');
      th.innerHTML = "MTWTFSS"[c];
      tr.appendChild(th);
  }
  table.appendChild(tr);
  //create 2nd row
  tr = document.createElement('tr');
  var c;
  for(c=0; c<=6; c++){
      if(c == day_no){
          break;
      }
      var td = document.createElement('td');
      td.innerHTML = "";
      tr.appendChild(td);
  }
  var count = 1;
  for(c=0; c<=6; c++){
      var td = document.createElement('td');
      if (count == todaysDate) {
        td.className = 'today';
      }
      td.innerHTML = count;
      count++;
      tr.appendChild(td);
  }
  table.appendChild(tr);
  //rest of the date rows
  for(var r=3; r<=7; r++){
      tr = document.createElement('tr');
      for(var c=0; c<=6; c++){
          if(count > days){
              table.appendChild(tr);
              return table;
          }
          var td = document.createElement('td');
          if (count == todaysDate) {
            td.className = 'today';
          }
          td.innerHTML = count;
          count++;
          tr.appendChild(td);
      }
      table.appendChild(tr);
  }
return table;
}


