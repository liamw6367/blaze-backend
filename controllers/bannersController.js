const db = require('../models');
const Banners = db.banners;
const to = require('../helpers/getPromiseResult');

exports.add = async (req, res) => {
    let data = req.body;
    await to(Banners.create(data));
    this.get(req, res);
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
    const banners = await to(Banners.findOne({
        id: req.params.id
    }));
    res.json(banners);
}

exports.update = async (req, res) => {
    let {id, ...data} = req.body;
    await to(Banners.update(data, {where: {id}}));
    res.json('OK');
}


exports.remove = async (req, res) => {
    let {id} = req.query;
    console.log('aaaaa')
    console.log(req.query)
    await to(Banners.destroy({where: {id}}));
    this.get(req, res);
}