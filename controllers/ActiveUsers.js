const activeUser = require("../models/activeUser.js");
const userEntry = require("../models/userEntry.js");

module.exports = function () {
    this.users = []; 

    this.pushNewUser = function (data) {
        this.users.push(activeUser(data));
    };

    this.createUserEntry = function (type, data) {
        return userEntry( type, data, this.users );
    };

    this.removeUser = function (id) {
        this.users = this.users.filter(user => user.id !== id);
    };

    this.getActiveUsers = function () {
        return this.users;
    };
}