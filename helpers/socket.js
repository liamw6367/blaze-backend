const redis = require('redis');
const redisClient = redis.createClient();

const moment = require('moment');


const DEFAULT_EXPIRATION_TIME = 3600;

getMessagesFromRedis = async () => {
    let messages = [];
    let messagesFromRedis = await redisClient.lRange('messages', 0, -1);
    messagesFromRedis.map(message => {
        let messageSource = message.split('&');
        messages.push({
            from_id: +messageSource[0],
            message: messageSource[1],
            to_id: +messageSource[2],
            created_at: messageSource[3]
        })
    });
    return messages;
};

removeTodaysMessages = async () => {
    await redisClient.del('messages');
};


socket = (io) => {
    io.on('connection', async (socket) => {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        console.log('new connection made');
        socket.on('sendMessage', async (data) => {
            // console.log(data)
            redisClient.rPush('messages', `1&${data.message}&5&${moment().format()}`);
            // redisClient.expire('messages','10');

            let messages = await getMessagesFromRedis();
            // console.log(messages)


            socket.emit('getMessages', messages);
        })
    })
};

module.exports = {
    getMessagesFromRedis,
    removeTodaysMessages,
    socket
};