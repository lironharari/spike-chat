module.exports = function ( type, data, users ) {
    return {
        type: type,
        users: users,
        name: data.name,
        id : data.id,
        date: data.date
    };
}; 