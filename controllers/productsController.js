const db = require('../models');
const Products = db.products;
const Categories = db.categories;
const Stores = db.stores;
const ProdCategories = db.product_categories;
const ProdStores = db.products_stores;

const m = require('../config/multer');
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let {category_ids, ...data} = req.body;
    console.log(category_ids)

    m.uploadImage(req, res, async (err) => {
        let prod = await to(Products.create(data));
        let categories = category_ids.split(',');
        categories.map(async (cat_id) => {
            await to(ProdCategories.create({category_id: cat_id, product_id: prod.id}))
        });
        this.get(req, res);
    })


};

exports.get = async (req, res) => {
    const stores = await to(Products.findAll({
        include: [
            {
                model: Categories, as: 'product_category', attributes: ['id', 'name']
            },
            {
                model: Stores, as: 'product_stores',
                attributes: ['id', 'name']
            }
        ],
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
};


exports.getOne = async (req, res) => {
    const stores = await to(Products.findOne({
        include: [{
            model: Categories, as: 'product_category'
        }],
        where: {
            id: req.query.id
        },
        // order: [['`products`.`created_at`','desc']]
    }));
    // console.log(stores)
    res.json(stores);
};

exports.update = async (req, res) => {


    m.uploadImage(req, res, async (err) => {
        let {category_ids, id, ...data} = JSON.parse(JSON.stringify(req.body))
        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        } else {
            // console.log(id, data)
            await to(Products.update(data, {where: {id}}));
            let prod = await to(Products.findOne({where: {id}}))
            await ProdCategories.destroy({where: {product_id: id}})

            let categories = category_ids.split(',');
            categories.map(async (cat_id) => {
                await to(ProdCategories.create({category_id: cat_id, product_id: prod.id}))
            });
            res.json('OK');
        }
    })
};


exports.remove = async (req, res) => {
    let {id} = req.query;
    await to(Products.destroy({where: {id}}));
    this.get(req, res);
};


exports.addProductToStore = async (req, res) => {
    let data = req.body;
    await ProdStores.create(data);
};
