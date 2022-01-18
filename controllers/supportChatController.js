const db = require('../models');
const Users = db.users;
const SupportChatMessages = db.support_chat_messages;


exports.getMessages = async (req, res) => {
    let messages = await SupportChatMessages.find({
    }).sort({'created_at': 1});
};


exports.saveMessages = async (messages) => {

};