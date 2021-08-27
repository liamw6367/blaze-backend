const db = require('../models');
const Stores = db.stores;
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;
    await to(Stores.create(data));
    this.get(req, res);
}

exports.get = async (req, res) => {
    const stores = await to(Stores.findAll({
        order: ['createdAt', 'desc']
    }));
    res.json(stores);
}