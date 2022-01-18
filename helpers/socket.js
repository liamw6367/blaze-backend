const moment = require('moment');


let users = [];




socket = (io) => {
    io.on('connection', async (socket) => {

        console.log('new connection made');

        socket.on('newUser', async (user) => {
            let username = user.username;
            users[username] = socket.id;
        });

        socket.on('sendMessage', async (data) => {

            io.emit('getMessages', messagesArr);
        })
    })
};


groupMessages = (collection, property = 'created_at' ) => {
    const groupedCollection = collection.reduce((previous, current) => {
        let key = current[property];
        if (property === 'created_at') {
            key = moment(current[property]).format('dddd, MMMM Do');
        }
        if (!previous[key]) {
            previous[key] = [current];
        } else {
            previous[key].push(current);
        }

        return previous;
    }, {});

    return Object.keys(groupedCollection).map(key => ({key, value: groupedCollection[key]}));
};

module.exports = {
    socket
};