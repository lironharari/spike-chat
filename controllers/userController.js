
/**
 * Import Models
 *  User - An active user
 *  Entry - a message for a client upon client entry (entry or exit)
 */
const User = require("../models/user.js");
const Entry = require("../models/entry.js");

module.exports = function () {
    this.users = []; // array of active users

    /**
     * Add a new user to the active users list.
     * @param {object} data - an object containing client message
     */    
    this.addUser = (data) => {
        this.users.push(User.create(data)); // push a new user into list
    };

    /**
     * Create an entry message to send to clients
     * @param {string} type - type of entry (enter or exit)
     * @param {object} data - an object containing user id, user name, and date of entry
     * @returns {object} - an object containing message type, a list of active users, 
     * user name, user id, and date of creation.
     */
    this.getUserEntry = (type, data) => (
        Entry.create(type, data, this.users) // create entry message
    )

    /**
     * Remove a user from the active list
     * @param {number} id - user id
     */    
    this.removeUser = (id) => {
        this.users = this.users.filter(user => user.id !== id); // filter out a user and update list
    };    
}