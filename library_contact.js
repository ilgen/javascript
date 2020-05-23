"use strict";

var Contact = function(first, last, org, phone, email) {
    if (arguments.length > 0) {
        this.firstName = first;
        this.lastName = last;
        this.organization = org;
        this.phone = phone;
        this.email = email;
    }
};

Contact.prototype.isValid = function() {
    // must have first and last name, and either phone number or email address
    var isValid = true; 
    if (this.firstName === "" || this.lastName === "") { isValid = false; }
    if (this.phone === "" && this.email === "") { isValid = false; }
    return isValid;
};

Contact.prototype.displayContact = function() {
    return this.firstName.concat(" ", this.lastName, ", ", 
        this.organization, "<br>Phone: ", this.phone, " <br>Email: ",
        this.email, "<hr>");
};

Contact.prototype.loadJsonObject = function(obj) {
    // use json object from storage to populate properties
    this.firstName = obj.f;
    this.lastName = obj.l;
    this.organization = obj.o;
    this.phone = obj.p;
    this.email = obj.e; 
};

Contact.prototype.toJSON = function() {
    // shorten property names for storage
    return {
        f: this.firstName,
        l: this.lastName,
        o: this.organization,
        p: this.phone,
        e: this.email
    };
};