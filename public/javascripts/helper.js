/**
 * Helper functions
 */

 /**
 * Shorten strings
 * @param {string} str - string to shorten
 * @returns {string} - a shortened string followed by 3 dots
 */ 
const ellipsify = (str) => (
    ((str.length > 10) ? `${str.substring(0, 10)}...` : str)
);

 /**
 * Date format
 * @returns {string} - a formated date ##.## AM/PM
 */ 
const getDate = () => (new Date().toLocaleString(
    [], 
    { hour: "2-digit", minute: "2-digit" }
    ));

 /**
 * Unique id
 * @returns {number} - unique number
 */     
const generateID = () => (
    Math.floor(Math.random() * 10000000)
);

 /**
 * Current Host for web socket
 * @returns {string} - formated web socket host url
 */     
const getHost = () => (
    window.location.origin.replace(/^http/, "ws")
);