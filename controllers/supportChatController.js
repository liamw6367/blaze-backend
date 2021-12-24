const db = require('../models');
const Users = db.users;
const SupportChatMessages = db.support_chat_messages;

let {getMessagesFromRedis, removeTodaysMessages} = require('../helpers/socket');


exports.getMessages = async (req, res) => {
    let messages = await getMessagesFromRedis();
    if (messages.length === 0) {
        messages = await SupportChatMessages.findAll({});
    }
    res.json(messages);
};

exports.saveRedisMessages = async (messages) => {
    console.log('REDIS MESSAGES', messages)
    await Promise.all(messages.map(async(message) => {
        await SupportChatMessages.create(message);
    }));
    await removeTodaysMessages();
};