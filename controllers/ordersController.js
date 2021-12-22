const db = require('../models');
const Orders = db.orders;
const Users = db.users;
const Products = db.products;
const OrdersProducts = db.orders_products;
const Categories = db.categories;
const Stores = db.stores;
const to = require('../helpers/getPromiseResult');
const m = require('../config/multer');

const sequelize = require('sequelize');
const moment = require('moment');
const Op = sequelize.Op;

exports.add = async (req, res) => {
    let {products, order_id, amount, ...data} = req.body;

    let result;
    if (order_id) {
        await OrdersProducts.destroy({where: {order_id}});
        result = products.map(async (product) => {
            await OrdersProducts.create({product_id: product.id, order_id: order_id, amount: product.amount})
        });
        req.query.order_id = order_id;
    } else {
        let f = await Orders.findOne({where: {user_id: data.user_id, checked_out: 0}});
        if (!f) {
            let newOrder = await Orders.create(data);
            result = products.map(async (product) => {
                await OrdersProducts.create({product_id: product.id, order_id: newOrder.id, amount: product.amount})
            });
            req.query.order_id = newOrder.id;
        } else {
            result = products.map(async (product) => {
                await OrdersProducts.create({product_id: product.id, order_id: f.id, amount: product.amount})
            });
        }

    }

    await Promise.all(result);
    req.query.checked_out = 0;
    req.query.user_id = data.user_id;

    this.get(req, res);
};

exports.get = async (req, res) => {
    let {checked_out, user_id, order_id, start_date, end_date} = req.query;
    console.log(req.query)

    let where = {};

    if (user_id) {
        where['user_id'] = user_id;
    }

    if (order_id) {
        where['id'] = order_id;
    }

    if (start_date && end_date) {
        where['`created_at`'] = {
            [Op.between]: [
                new Date(start_date),
                new Date(end_date)
            ]
        };
    }

    if (checked_out) {
        where.checked_out = checked_out;
    }


    console.log('where', where)

    let r = await Orders.findAll({
        include: [
            {
                model: Products, as: 'product_orders', include: [
                    {
                        model: Categories, as: 'product_category', attributes: ['id', 'name'],
                        through: {attributes: []}
                    },
                    {
                        model: Stores, as: 'product_stores',
                        attributes: ['id', 'name', 'contact_number'],
                        through: {attributes: []}
                    }
                ]
            },
            {model: Users, attributes: ['id', 'email', 'first_name', 'last_name']}
        ],
        where
    });

    res.json(r);
};

exports.checkOutOrder = async (req, res) => {
    let {order_id, total_price} = req.body;
    await Orders.update({checked_out: 1, total_price}, {where: {id: order_id}});
    res.json('OK')
};

exports.cancelOrder = async (req, res) => {
    let {order_id} = req.query;
    await Orders.destroy({where: {id: order_id}});
    await OrdersProducts.destroy({where: {order_id}});
    res.json('OK')
};

exports.removeProductFromOrder = async (req, res) => {
    let {product_id, order_id} = req.query;
    await OrdersProducts.destroy({
        where: {product_id, order_id}
    });
    this.get(req,res);
};