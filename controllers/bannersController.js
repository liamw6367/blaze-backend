const db = require('../models');
const Banners = db.banners;
const to = require('../helpers/getPromiseResult');
const m = require('../config/multer');

exports.add = async (req, res) => {
    let data = req.body;

    m.uploadImage(req, res, async (err) => {
        await to(Banners.create(data));
        this.get(req, res);
    })
}

exports.get = async (req, res) => {
    const banners = await to(Banners.findAll({
        order: [
            ['id', 'DESC']
        ],
    }));
    res.json(banners);
}

exports.getOne = async (req, res) => {
    console.log(req.query)
    const banners = await to(Banners.findOne({
        where: {
            id: req.query.id
        }
    }));
    res.json(banners);
}

exports.update = async (req, res) => {
    m.uploadImage(req, res, async (err) => {
        let {id, ...data} = req.body;
        console.log(req.body)
        await to(Banners.update(data, {where: {id}}));
        res.json('OK');
    })
}


exports.remove = async (req, res) => {
    let {id} = req.query;
    console.log('aaaaa')
    console.log(req.query)
    await to(Banners.destroy({where: {id}}));
    this.get(req, res);
}