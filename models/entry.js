/**
 * Create client entry message
 * @param {string} type - type of entry (enter or exit)
 * @param {object} data - client message upon entry
 * @param {object} users - a list of active users as array
 * @returns {object} - a message for the client containing entry type (enter or exit)
 * a list of active users, client name, client id, and date of entry
 */
module.exports.create = (type, data, users) => (
    {
        type: type,
        users: users,
        name: data.name,
        id : data.id,
        date: data.date
    }
)