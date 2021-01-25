/**
 * Global variables
 */

var userID = 0; // client id
var userName = ""; // client name
var userAvatar = ""; // client avatar
var ws = null; // web socket
var messageType = { // various web socket message types
    OPEN: 'onopen', // new client
    MESSAGE: 'chat-message', // client message
    CLOSE: 'onclose' // client exit
};