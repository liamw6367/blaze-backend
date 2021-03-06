const db = require('../models');
const DeliveryFee = db.delivery_fee;

exports.get = async (req, res) => {
    let d = await db.delivery_fee.findOne({});
    res.json(d);
};

exports.update = async (req, res) => {
    let {id, price} = req.body;
    await DeliveryFee.update({price}, {where: {id}});
    this.get(req, res);
};