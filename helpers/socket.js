const moment = require('moment');


let users = [];
const supportChatController = require('../controllers/supportChatController');



socket = (io) => {
    io.on('connection', async (socket) => {

        console.log('new connection made');

        socket.on('newUser', async (user) => {
            let username = user.username;
            users[username] = socket.id;
            let c = await supportChatController.createChatConnection(user);
            io.emit('userConnected', {
                msg:`${user.username} is connected`,...JSON.parse(JSON.stringify(c)),
                ...user
            });
        });

        socket.on('sendMessage', async (data) => {
            let messages = await supportChatController.getMessages({return:true,...data});
            io.emit('getMessages', messages);
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