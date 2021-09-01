const db = require('../models');
const Categories = db.categories;

const m = require('../config/multer');
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;

    console.log("req.body", req.body)

    m.uploadBannerThumb(req, res, async (err)=> {
        let data = JSON.parse(JSON.stringify(req.body));
        console.log(data)
        await to(Categories.create(data));
        this.get(req, res);
    })
}

exports.get = async (req, res) => {
    const stores = await to(Categories.findAll({
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(stores);
}