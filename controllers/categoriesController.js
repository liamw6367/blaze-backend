const db = require('../models');
const Categories = db.categories;
const Products = db.products;

const m = require('../config/multer');
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;

    console.log("req.body", req.body)


    m.uploadBannerThumb(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        } else {
            let data = JSON.parse(JSON.stringify(req.body));
            console.log(data)
            await to(Categories.create(data));
            this.get(req, res);

        }


    })
}

exports.get = async (req, res) => {
    const stores = await to(Categories.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: [{
            model: Products, as: 'products',
            through: {  attributes: [] }
        }],
    }));
    res.json(stores);
}

exports.getOne = async (req, res) => {
    const stores = await to(Categories.findOne({
        where: {
            id: req.query.id
        }
    }));
    // console.log(stores)
    res.json(stores);
}

exports.update = async (req, res) => {


    m.uploadBannerThumb(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        } else {
            let {id, ...data} = JSON.parse(JSON.stringify(req.body));
            await to(Categories.update(data, {where: {id}}));
            res.json('OK');
        }
    })
}

exports.remove = async (req, res) => {
    let {id} = req.query;
    await to(Categories.destroy({where: {id}}));
    this.get(req, res);
}