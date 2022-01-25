let mongoose = require('mongoose')
const moment = require('moment');

let MessagesSchema = new mongoose.Schema({
    from_id: {
        type: Number,
        required: true
    },
    connection_id: {
        type: Number,
        required: true
    },
    // from_user_id: {
    //     type: Number,
    //     required: true
    // },
    message: {
        type: String
    },
    // to_user: {
    //     type: String,
    //     required: true
    // },
    to_id: {
        type: Number,
    },
    seen: {
        type: Boolean
    },
    seen_at:{
        type: String
    },
    // created: {
    //     type: Date,
    //     default: moment().format()
    // }

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('SupportMessages', MessagesSchema,'support_chat_messages');
