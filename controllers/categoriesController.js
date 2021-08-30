const db = require('../models');
const Categories = db.categories;
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;
    await to(Categories.create(data));
    this.get(req, res);
}

exports.get = async (req, res) => {
    const stores = await to(Categories.findAll({
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
}