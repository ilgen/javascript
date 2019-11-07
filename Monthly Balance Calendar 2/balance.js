"use strict"; 


var $ = function (id) { return document.getElementById(id); };

var updateDisplay = function () {
    var html = "<tr><th>Date</th><th>Amount</th><th>Balance</th></tr>";
    var html = html.concat("<tr><td></td><td></td><td>0</td></tr>"); 

    var count = getTransaction();//get number of elements in transList array through setting count equal to index
    var total = 0; // start a tally of deposits and withdrawals

    // create grid for transactions
    for (var i = 0; i < count; i++) {
        var trans = getTransaction(i);
        total = calculateBalance(trans["type"], trans["amount"], total);//get toal balance after current transaction.
        
        html = html.concat("<tr><td>", trans["dateDisplay"], "</td><td>", trans["amountDisplay"], "</td><td>", formatTotal(total), "</td></tr>");
    }
    
    $("transactions").innerHTML = html;

};

//if date input field is blank(noTrim) , it means user wants to enter current date
var getValidDateString = function () {
    var dtParts; //undefined
    //if user wants current date
    if ($("date").value === "") {
        dtParts = getDateParts();
    } else {
        dtParts = getDateParts($("date").value);
    }
    //if user wants current date, almost no chance that dtParts remains undefined
    //but if user enters some value it must be a valid date in format MM/DD/YYYY or else dtParts is undefined
    if (typeof dtParts !== "undefined") {
        //return valid date entered/ assumed in format MMM DD YYYY through a ternary expression
        return months[dtParts[0] - 1] + " " + ((dtParts[1] < 10 ? "0" : "") + dtParts[1]) + " " + dtParts[2];
    }
    alert("Please enter date in format MM/DD/YYYY e.g. 02/28/2017. You may leave blank if transaction happened today.");// Instrictions
    $("date").focus(); // take user to date input field to re-enter.


};


// there is almost no chance of error here, since dropdown has only two options
var getValidType = function (type) {

    if ($("type").value === "deposit" || $("type").value === "withdrawal")
        return $("type").value;

    alert("Invalid Type.");
    $("type").focus();

}
// error handling: if user enters some random text or he tries to give negative values, this will throw alert.
var getValidateAmount = function () {

    //check if not a number.
    if (isNaN($("amount").value)) {
        alert("Invalid amount.");
        $("amount").focus();
        return;
    }

    var returnValue = parseFloat($("amount").value, 10).toFixed(2);// formatted string amount
    
    if (parseFloat($("amount").value, 10) < 0) {
        alert("If it is a withdrawal, select withdrawal in Type dropdown and enter a positive amount here.");
        $("amount").focus();
        return;
    }
    return returnValue;
}

var add = function () {
    var cType = getValidType();
    var cAmount = getValidateAmount();
    var cDateString = getValidDateString();
    if (typeof cType === "undefined" || typeof cAmount === "undefined" || typeof cDateString === "undefined")
        return;
    //till this point we are ready with valid inputs(assumed/actual).
    addTransaction(cType, cAmount, cDateString);
    //now update display to include just added transaction.
    updateDisplay();
};

//bind add function to click of add button on load of window
window.onload = function () {
    $("add").onclick = add;
    updateDisplay();
};