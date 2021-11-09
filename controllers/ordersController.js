const db = require('../models');
const Orders = db.orders;
const Products = db.products;
const OrdersProducts = db.orders_products;
const to = require('../helpers/getPromiseResult');
const m = require('../config/multer');

exports.add = async (req, res) => {
    let {product_ids, order_id, ...data} = req.body;
    let newOrder = await Orders.create(data);
    product_ids.map(async (product_id) => {
        await OrdersProducts.create({product_id, order_id: newOrder.id})
    });
    this.get(req, res);
};

exports.get = async (req, res) => {
    let r = await Orders.findAll({
        include: [
            {model: Products, as: 'product_orders'}
        ]
    });

    res.json(r);
};