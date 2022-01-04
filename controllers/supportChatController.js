const db = require('../models');
const Users = db.users;
const SupportChatMessages = db.support_chat_messages;

let {getMessagesFromRedis, generateFtSearchQuery, removeTodaysMessages, groupMessages} = require('../helpers/socket');


exports.getMessages = async (req, res) => {
    let data = req.query;
    let messages = await getMessagesFromRedis(generateFtSearchQuery(data));
    if (messages.length === 0) {
        messages = await SupportChatMessages.findAll({});
    }

    res.json(groupMessages(messages));
};


exports.saveRedisMessages = async (messages) => {
    console.log('REDIS MESSAGES', messages)
    await Promise.all(messages.map(async(message) => {
        await SupportChatMessages.create(message);
    }));
    await removeTodaysMessages();
};