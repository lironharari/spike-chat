
/**
 * Import Models
 *  activeUser - A users that is in the chat
 *  userEntry - a message for client upon client entry (entry or exit)
 */
const activeUser = require("../models/user.js");
const userEntry = require("../models/entry.js");

module.exports = function () {
    this.users = []; // array of active users

    /**
     * Add a new user to the active users list.
     * @param {object} data - an object containing client message
     */    
    this.pushNewUser = (data) => {
        this.users.push(activeUser(data)); // push a new user into list
    };

    /**
     * Create an entry message to send to clients
     * @param {string} type - type of entry (enter or exit)
     * @param {object} data - an object containing user id, user name, and date of entry
     * @returns {object} - an object containing message type, a list of active users, 
     * user name, user id, and date of creation.
     */
    this.createUserEntry = (type, data) => (
        userEntry(type, data, this.users)
    )

    /**
     * Remove a user from the active list
     * @param {number} id - user id
     */    
    this.removeUser = (id) => {
        this.users = this.users.filter(user => user.id !== id); // filter a user and update list
    };

    /**
     * Get list of active users
     * @returns {object} - list of active users as array
     */     
    this.getActiveUsers = () => (
        this.users
    )
}