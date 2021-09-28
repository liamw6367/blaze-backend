// Multer stuff
multer = require('multer');
const c = require('./constants');
const path = require('path');
const generateFolderPath = require('../helpers/generateFolderPath');
const fse = require('fs-extra')


let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const data = req.body;
        const edit = !!data.id;
        console.log(file.fieldname)
        let dir;
        if (file.fieldname === 'thumbnail_file') {
            dir = await generateFolderPath('category_thumbs', edit, data);
        } else if (file.fieldname === 'banner_file') {
            dir = await generateFolderPath('banners', edit, data);
        } else {
            dir = await generateFolderPath(data.folder, edit, data);
        }


        console.log('DIR!!!!!')
        console.log(dir)
        console.log('DIR!!!!!')

        await fse.ensureDir(dir);

        cb(null, dir)
    },
    filename: async function (req, file, cb) {
        cb(null, file.originalname)
    }
});


let upload = multer({
    storage: storage,
    limits: {fileSize: c.UPLOAD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {
        console.log('file filter!!!!')
        let filetypes = /jpeg|jpg|png|bmp/;
        console.log(file.mimetype)
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (!mimetype && !extname) {
            console.log('invalid type!!')
            req.fileTypeError = {msg: "The file has an invalid type"};
            return cb(null, false, req.fileTypeError)
        }
        cb(null, true);
    }
});


module.exports = {
    uploadAvatar: upload.single('avatar_file'),
    uploadImage: upload.single('image_file'),
    uploadImages: upload.array('upload_images'),
    uploadBanner: upload.single('banner_file'),
    uploadBannerThumb: upload.fields([{
        name: 'banner_file', maxCount: 1
    }, {
        name: 'thumbnail_file', maxCount: 1
    }])
};


