// Multer stuff
multer = require('multer');
const c = require('./constants');
const path = require('path');
const generateFolderPath = require('../helpers/generateFolderPath');


let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const data = req.body;
        const edit = !!data.id;
        let dir = await generateFolderPath(data.folder, edit, data);

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
        let filetypes = /jpeg|jpg/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (!mimetype && !extname) {
            req.fileTypeError = {message: "The file has an invalid type"};
            return cb(null, false, req.fileTypeError)
        }
        cb(null, true);
    }
});


module.exports = {
    uploadAvatar: upload.single('avatar_file'),
    uploadImages: upload.array('upload_images')
};


