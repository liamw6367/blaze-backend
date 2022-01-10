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

    let messages = await redisClient.ft.search('chat_idx', query, {LIMIT: {from: 0, size: 1000}, SORTBY: {BY: 'created_at', DIRECTION: 'ASC'}});

    // console.log(messages?.documents.map(d=> d.value));
    return messages?.documents.map(d => d.value) || [];


};

removeTodaysMessages = async () => {
    await redisClient.del('messages');
};


socket = (io) => {
    io.on('connection', async (socket) => {
        if (!redisClient.isOpen) {
            console.log('redis connection!!!')
            await redisClient.connect();
        }
        // console.log('new connection made');

        socket.on('newUser', async (user) => {
            let username = user.username;
            users[username] = socket.id;
        });

        socket.on('sendMessage', async (data) => {
            let messagesArr = await getMessagesFromRedis(generateFtSearchQuery(data));

            // messagesArr.push({...data, created_at: moment().format()});
            let newRecord = {...data, created_at: moment().format()}
            let key = `chat:messages:${messagesArr.length + 1}`;
            await redisClient.hSet(key, newRecord);

            messagesArr = await getMessagesFromRedis(generateFtSearchQuery(data));
            messagesArr  = data.role === 'admin' ? groupMessages(messagesArr): messagesArr;
            io.emit('getMessages', messagesArr);
        })
    })
};

generateFtSearchQuery = ({from_id, to_id}) => {
    let redisQuery = '*';
    if (from_id) {
        redisQuery = `@from_id:[${from_id} ${from_id}]|@to_id:[${from_id} ${from_id}]`;
        if (to_id) {
            redisQuery = `(@from_id:[${from_id} ${from_id}] @to_id:[${to_id} ${to_id}])|(@from_id:[${to_id} ${to_id}] @to_id:[${from_id} ${from_id}])`;
        }
    }

    return redisQuery;
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
    getMessagesFromRedis,
    generateFtSearchQuery,
    removeTodaysMessages,
    groupMessages,
    socket
};