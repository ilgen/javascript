"use strict"; 


var transList = []; // list of transactions

//use an array of arrays with shortened months as string indices
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//function to get the transation 
function transaction(type, amount, date) {
    this.type = type; // deposit or withdrawal  - string
    this.amount = amount; //string
    this.amountDisplay = (type === "deposit") ? amount : "(" + amount + ")"; // display (amount) for withdrawal
    this.dateDisplay = date;//date is already validated and converted to format to be displayed

};

// to clean up the date entered as dd/mm/yyyy
var getDateParts = function (dateValue) {

    if (typeof dateValue === "undefined") {
        var currentdate = new Date();
        //month is done + 1 because it returns one less number than actual month e.g. 2 for march
        return [currentdate.getMonth() + 1, currentdate.getDate(), currentdate.getFullYear()];
    }
    var datereg = /^\d{1,2}\/\d{1,2}\/\d{4}$/; //e.g.  99/99/9999
    if (dateValue.match(datereg)) { // check to match the entered value with reg exp
        var splitDateInput = dateValue.split("/"); // tidy up each date value with parse and split methood to generate new arrays 
        var monthPart = parseInt(splitDateInput[0], 10);// e.g. 99
        var dayPart = parseInt(splitDateInput[1], 10);// e.g. 99
        var yrPart = parseInt(splitDateInput[2], 10);// e.g. 1111
        var date = new Date();// gives current date
        date.setYear(yrPart); // recieve new data and set date
        date.setMonth(monthPart - 1);
        date.setDate(dayPart);
        // test data ( 99/99/1111) gives date as Sat Jun 07 1119 00:00:00 GMT-0400 (Eastern Daylight Time)
        // compare with inputs again.
        //leap check is also done in below if condition, like 02/29/2015 will fail here.
        if (date.getFullYear() === yrPart && date.getMonth() + 1 === monthPart && date.getDate() === dayPart) {
            return [monthPart, dayPart, yrPart];
        }
        //if input was valid ,an array containing month, day , year numbers is returned

    }

}

var getTransaction = function (index) {
    if (typeof index === "undefined") {
        return transList.length;
    }
    else if (index < transList.length) {
        return transList[index];
    }

};

var addTransaction = function (type, amount, date) {

    transList.push(new transaction(type, amount, date));
};

var calculateBalance = function (type, amount, total) {
    //amount = parseFloat(parseFloat(amount, 10).toFixed(2), 10);
    // total = parseFloat(parseFloat(total, 10).toFixed(2), 10);
    amount = parseFloat(amount, 10);
    total = parseFloat(total, 10);
    if (type === "deposit")
        return (total + amount).toFixed(2);
    else
        return (total - amount).toFixed(2);
};

//used to format strings

var formatTotal = function (am) {

    am = parseFloat(am, 10);

    return (am < 0) ? "(" + Math.abs(am).toFixed(2) + ")" : am.toFixed(2);


};
