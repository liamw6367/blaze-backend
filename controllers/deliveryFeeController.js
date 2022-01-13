const db = require('../models');
const DeliveryFee = db.delivery_fee;

exports.get = async (req, res) => {
    let d = await DeliveryFee.findOne({});
    return d;
};

exports.update = async (req, res) => {
    let {id, price} = req.body;
    await DeliveryFee.update({price}, {where: {id}});
    res.json('OK');
};