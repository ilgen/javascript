"use strict";
var $ = function (id) { return document.getElementById(id); };
var contacts = [];

var displayContacts = function () {
    // clear previous
    contacts.length = 0;
    $("contacts").innerHTML = "";
    
    // get contacts from storage and initialize a variable to hold html string
    var array = storage.getContacts();
    var html = "";
    
    // loop array from storage, create new Contact objects, store
    // them in contacts array and use the displayContact method for display
    for (var i = 0; i < array.length; i++) {
        var contact = new Contact();
        contact.loadJsonObject(array[i]);
        html = html.concat("<tr><td>", contact.displayContact(),"</td></tr>");
        contacts[i] = contact;
    }

    // display html string and set focus on first textbox
    $("contacts").innerHTML = html;
    $("first").focus();
};

var addContact = function () {   
    // get values from textboxes
    var first = $("first").value;
    var last = $("last").value;
    var org = $("org").value;
    var phone = $("phone").value;
    var email = $("email").value;

    // use values to create a new Contact object
    var contact = new Contact(first, last, org, phone, email);
    
    // contact is valid, 
    if (contact.isValid()){
        // add contact to array and reset local storage
        contacts.push(contact);
        storage.setContacts(contacts);

        // clear text boxes and re-display contacts
        clearTextBoxes();
        displayContacts();
    } else {  
        alert("Please enter a first and last name, and a phone number or email address.");
        $("first").focus();
    }
};

var clearTextBoxes = function() {
    $("first").value = "";
    $("last").value = "";
    $("org").value = "";
    $("phone").value = "";
    $("email").value = "";
};

var eraseContacts = function() {
    storage.clearContacts();
    contacts.length = 0;
    $("contacts").innerHTML = "";
    $("first").focus();
};

window.onload = function() {
    $("add_contact").onclick = addContact; 
    $("erase").onclick = eraseContacts;
    displayContacts();
};