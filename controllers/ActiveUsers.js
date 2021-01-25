/**
 * Import Models
 *  activeUser - A users that is in the chat
 *  userEntry - a message for client upon client entry (entry or exit)
 */

const activeUser = require("../models/activeUser.js");
const userEntry = require("../models/userEntry.js");

module.exports = function () {
    this.users = []; // array of active users

    /**
     * Add a new user to the active users list.
     * @param {object} data - an object containing client message
     */        
    this.pushNewUser = function (data) {
        this.users.push(activeUser(data)); // push a new user into list
    };

    /**
     * Create an entry message to send to clients
     * @param {string} type - type of entry (enter or exit)
     * @param {object} data - an object containing user id, user name, and date of entry
     * @returns {object} - an object containing message type, a list of active users, 
     * user name, user id, and date of creation.
     */    
    this.createUserEntry = function (type, data) {
        return userEntry(type, data, this.users);
    };

    /**
     * Remove a user from the active list
     * @param {number} id - user id
     */
    this.removeUser = function (id) {
        this.users = this.users.filter(user => user.id !== id); // filter a user and update list
    };

    /**
     * Get list of active users
     * @returns {object} - list of active users as array
     */
    this.getActiveUsers = function () {
        return this.users;
    };
}