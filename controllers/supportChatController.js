const db = require('../models');
const Users = db.users;
const ChatConnection = db.support_chat_connections;
const ChatConnectionStatus = db.support_chat_connection_statuses;
const SupportChatMessages = require('../mongoose/support_chat_messages');

const nl2br = require('../helpers/nl2br');

exports.createChatConnection = async (data) => {
    let {customer_id} = data;
    let conn = await ChatConnection.findOne({where: {customer_id}});
    if (!conn) {
        let idleStatus = await ChatConnectionStatus.findOne({where: {name: 'idle'}});
        conn = await ChatConnection.create({customer_id, status_id: idleStatus.id});
    }

    return conn;
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