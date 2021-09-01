const db = require('../models');
const Products = db.products;

const m = require('../config/multer');
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;

    m.uploadImage(req, res, async (err) => {
        await to(Products.create(data));
        this.get(req, res);
    })


}

exports.get = async (req, res) => {
    const stores = await to(Products.findAll({
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
}
