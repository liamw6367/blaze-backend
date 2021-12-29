const redis = require('redis');
const redisClient = redis.createClient({
    host: '127.0.0.1'
});

const moment = require('moment');


const DEFAULT_EXPIRATION_TIME = 3600;

let users = [];

getMessagesFromRedis = async (query = '*') => {
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

    // await redisClient.ft.create('idx:chat',{
    //     //     from_id: {
    //     //         type: SchemaFieldTypes.NUMERIC,
    //     //         sortable: true
    //     //     },
    //     //     to_id: {
    //     //         type: SchemaFieldTypes.NUMERIC,
    //     //         sortable: true
    //     //     },
    //     // }, {
    //     //     ON: 'HASH',
    //     //     PREFIX: 'chat:messages'
    //     // });
    //     //
    //     //
    //     // let messages = await redisClient.get('messages');
    //     // return JSON.parse(messages) || [];


    let messages = await redisClient.ft.search('chat_idx', query);
    console.log(messages)
    return messages?.documents || [];

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


            messagesArr.push({...data, created_at: moment().format()});
            let newRecord = {...data, created_at: moment().format()}
            console.log(newRecord, {...Object.entries(newRecord)})
            redisClient.hSet('chat:messages:5', ...Object.entries(newRecord));
//             redisClient.set(`messages`, JSON.stringify(messagesArr));
            // redisClient.rPush('messages', `${data.from_id}&${data.message}&${data.to_id}&${moment().format()}`);
            // redisClient.expire('messages','10');
            // messages = await eval(redis Client.get('messages'));

            // console.log(JSON.parse(messages))

            let redisQuery = `(@from_id:[${data.from_id} ${data.from_id}] @to_id:[${data.to_id} ${data.to_id}])|(@from_id:[${data.to_id} ${data.to_id}] @to_id:[${data.from_id} ${data.from_id}])`;
            messagesArr = await getMessagesFromRedis(redisQuery);
            io.emit('getMessages', messagesArr);
        })
    })
};

module.exports = {
    getMessagesFromRedis,
    removeTodaysMessages,
    socket
};