const db = require('../models');
const DeliveryFee = db.delivery_fee;

exports.get = async (req, res) => {
    console.log('aaaaa')
    let d = await db.delivery_fee.findOne({});
    return d;
};

exports.update = async (req, res) => {
    let {id, price} = req.body;
    await DeliveryFee.update({price}, {where: {id}});
    res.json('OK');
};