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
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
}

exports.getOne = async (req, res) => {
    const stores = await to(Stores.findOne({
        id: req.params.id
    }));
    res.json(stores);
}

exports.update = async (req, res) => {
    let {id, ...data} = req.body;
    await to(Stores.update(data, {where: {id}}));
    res.json('OK');
}