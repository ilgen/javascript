var $ = function(id) {
    return document.getElementById(id);
};

var $ = function(id) {
    return document.getElementById(id);
};

var processEntry = function() {
	var entry = $("cents").value;         
    var cents = parseInt(entry);        
	makeChange(cents);
	$("cents").focus();
};
var makeChange = function(cents) {
	if (!isNaN(cents) && cents < 100 && cents > 0) {  // checks the input to see if it is a number in the desired range
	var quarters = parseInt(cents / 25); // gets the number of quarters
    var dimes = parseInt(((cents - (quarters * 25)) / 10)); // next, get number of dimes by subtracting from the amount of quarters (if applicable) divided by the lower denomination; repeat step for lower denominations
    var nickels = parseInt(((cents - (quarters * 25)) - (dimes * 10)) / 5); // get number of nickels
    var pennies = parseInt(((cents - (quarters * 25)) - (dimes * 10)) - (nickels * 5)); // get number of pennies
    // display the change (in the html)_
    $("quarters").value = quarters;
    $("dimes").value = dimes;
    $("nickels").value = nickels;
    $("pennies").value = pennies;
  } else {
  alert("Error");
  }
};


window.onload = function () {
    $("calculate").onclick = processEntry;
	$("cents").focus();
};