const redis = require('redis');
const redisClient = redis.createClient({
    host: '127.0.0.1'
});

const moment = require('moment');


const DEFAULT_EXPIRATION_TIME = 3600;

let users = [];

getMessagesFromRedis = async () => {
    // let messages = [];
    // let messagesFromRedis = await redisClient.lRange('messages', 0, -1);
    // messagesFromRedis.map(message => {
    //     let messageSource = message.split('&');
    //     messages.push({
    //         from_id: +messageSource[0],
    //         message: messageSource[1],
    //         to_id: +messageSource[2],
    //         created_at: messageSource[3]
    //     })
    // });

    await redisClient.ft.create('idx:chat',{
        from_id: {
            type: SchemaFieldTypes.NUMERIC,
            sortable: true
        },
        to_id: {
            type: SchemaFieldTypes.NUMERIC,
            sortable: true
        },
    }, {
        ON: 'HASH',
        PREFIX: 'chat:messages'
    });


    let messages = await redisClient.get('messages');
    return JSON.parse(messages) || [];
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

        socket.on('newUser', async (user) => {
            let username = user.username;
            users[username] = socket.id;
        });

        socket.on('sendMessage', async (data) => {
            let messagesArr = await getMessagesFromRedis();




//             messagesArr.push({...data, created_at: moment().format()});
// console.log(JSON.stringify(messagesArr))
//             redisClient.set(`messages`, JSON.stringify(messagesArr));
            // redisClient.rPush('messages', `${data.from_id}&${data.message}&${data.to_id}&${moment().format()}`);
            // redisClient.expire('messages','10');
            // messages = await eval(redis Client.get('messages'));

            // console.log(JSON.parse(messages))

            messagesArr = await getMessagesFromRedis();
            io.emit('getMessages', messagesArr);
        })
    })
};

module.exports = {
    getMessagesFromRedis,
    removeTodaysMessages,
    socket
};