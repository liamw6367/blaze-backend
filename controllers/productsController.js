const db = require('../models');
const Products = db.products;
const Categories = db.categories;
const Stores = db.stores;
const ProdCategories = db.product_categories;
const ProdStores = db.products_stores;
const sequelize = require('sequelize');

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
    let {store_id} = req.query;
    let where = {};
    if (store_id) {
        where = sequelize.where(sequelize.col('`product_stores`.`id`'), store_id);
    }
    console.log('get products!!!!')
    console.log(where)
    const stores = await to(Products.findAll({
        include: [
            {
                model: Categories, as: 'product_category', attributes: ['id', 'name'],
                through: {attributes: []}
            },
            {
                model: Stores, as: 'product_stores',
                attributes: ['id', 'name', 'contact_number'],
                through: {attributes: []},
            }
        ],
        where,
        order: [
            ['id', 'DESC']
        ],

    }));
    res.json(stores);
};


exports.getOne = async (req, res) => {
    const stores = await to(Products.findOne({
        include: [
            {
                model: Categories, as: 'product_category'
            },
            {
                model: Stores, as: 'product_stores',
                attributes: ['id', 'name', 'contact_number'],
                through: {attributes: []},
            }
        ],
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
    let {id, store_id} = req.query;
    console.log('remove product!!!!')
    console.log(store_id)
    let where = {product_id: id};
    if (store_id) {
        where.store_id = store_id;
        req.query.store_id = store_id;
        await to(ProdStores.destroy({where}));
    } else {
        await to(Products.destroy({where: {id}}));

    }

    this.get(req, res);
};


exports.addProductToStore = async (req, res) => {
    let {store_id, product_ids} = req.body;
    console.log('add product to store!!!')
    await ProdStores.destroy({where: {store_id}});
    let result = product_ids.map(async (product_id) => {
        await ProdStores.create({product_id, store_id});
    });

    await Promise.all(result);
    res.json('OK');
};
