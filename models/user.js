/**
 * Create active user object
 * @param {object} data - an object containing client message
 * @returns {object} - an object containing user id, user name, and avatar image
 */
module.exports.create = (data) => (
    {
        id: data.id,
        name: data.name,
        avatar: data.avatar
    }
)