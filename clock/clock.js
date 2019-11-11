"use strict";
var $ = function(id) { return document.getElementById(id); };


var displayCurrentTime = function() {
var now = new Date();
var hours = now.getHours();
var ampm = "AM"; // set default value
  
// correct hours and AM/PM value for display
if (hours > 12) { // convert from military time
hours = hours - 12;
ampm = "PM";
} else { // adjust 12 noon and 12 midnight
switch (hours) {
case 12: // noon
ampm = "PM";
break;
case 0: // midnight
hours = 12;
ampm = "AM";
}
}
  
$("hours").firstChild.nodeValue = hours;
$("minutes").firstChild.nodeValue = padSingleDigit(now.getMinutes());
$("seconds").firstChild.nodeValue = padSingleDigit(now.getSeconds());
$("ampm").firstChild.nodeValue = ampm;
};

var padSingleDigit = function(num) {
return (num < 10) ? "0" + num : num;
};

window.onload = function() {
	
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
	// call displayCurrentTime and padSingleDigit and set interval
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
};

