const db = require('../models');
const Orders = db.orders;
const Products = db.products;
const OrdersProducts = db.orders_products;
const Categories = db.categories;
const Stores = db.stores;
const to = require('../helpers/getPromiseResult');
const m = require('../config/multer');

exports.add = async (req, res) => {
    let {products, order_id,amount, ...data} = req.body;

    if(order_id){
        await OrdersProducts.destroy({where:{order_id}});
        products.map(async (product) => {
            await OrdersProducts.create({product_id: product.id, order_id: order_id, amount: product.amount})
        });
    }

    else {
        let newOrder = await Orders.create(data);
        products.map(async (product) => {
            await OrdersProducts.create({product_id: product.id, order_id: newOrder.id, amount: product.amount})
        });
    }


    req.query.checked_out = 0;
    req.query.user_id = data.user_id;
    this.get(req, res);
};

exports.get = async (req, res) => {
    let {checked_out, user_id} = req.query;

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
            }
        ],
        where: {
            checked_out, user_id
        }
    });

    res.json(r);
};