const db = require('../models');
const Stores = db.stores;
exports.add = async (req, res) => {
    let data = req.body;
    console.log(req.body)
    await Stores.create(data);
    this.get(req, res);
}

exports.get = async (req, res) => {
    const stores = await Stores.findAll({});
    res.json(stores);
}