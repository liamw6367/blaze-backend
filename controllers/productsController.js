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


exports.getOne = async (req, res) => {
    const stores = await to(Products.findOne({
        where: {
            id: req.query.id
        }
    }));
    // console.log(stores)
    res.json(stores);
}

exports.update = async (req, res) => {


    m.uploadImage(req, res, async (err) => {
        let data = JSON.parse(JSON.stringify(req.body))
        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        } else {
            let {id, ...data} = JSON.parse(JSON.stringify(req.body));
            // console.log(id, data)
            await to(Products.update(data, {where: {id: +id}}));
            res.json('OK');
        }
    })
}