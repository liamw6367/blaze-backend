const db = require('../models');
const Users = db.users;
const ChatConnection = db.users;
const SupportChatMessages = require('../mongoose/support_chat_messages');

const nl2br = require('../helpers/nl2br');

exports.createChatConnection = async (data) => {
    let {customer_id} = data;
    let c = await ChatConnection.create({customer_id});
    console.log(c)
    return c;
};

exports.assignChatConnection = async (req, res) => {
    let {user_id, support_id} = req.body;
    await ChatConnection.update({support_id}, {where: {user_id}})
    res.json('OK')
};

exports.getMessages = async (req, res) => {
    let {connection_id} = req || req.query;
    let messages = await SupportChatMessages.find({
        connection_id
    }).sort({'created_at': 1});

    res.json(messages);
};


exports.saveMessages = async (req, res) => {
    let data = req.body;
    data.message = nl2br(data.message, false);
    let newMsg = new SupportChatMessages(data);
    await to(newMsg.save());
    this.getMessages(req, res);
};