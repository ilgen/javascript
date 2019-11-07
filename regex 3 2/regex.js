"use strict";
var $ = function(id) { return document.getElementById(id); };

var validatePhone = function() {
    var phone = $("phone").value;
    var pattern = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;                        // 999-999-9999
    var isValid = pattern.test(phone);

    $("message").firstChild.nodeValue = (isValid) ? "Valid phone number" : "Invalid phone number";
    return isValid; 
};

window.onload = function() {
    $("validate").onclick = validatePhone;
    $("phone").value = "123-456-7890";  // set default phone number
};