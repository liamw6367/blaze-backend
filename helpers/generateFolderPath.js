const c = require('../config/constants');
const path = require('path');
const fse = require('fs-extra');
module.exports = async (folder, edit, data) => {
    let dir;

    if (edit) {

    } else {

    }

    dir = path.join(c.UPLOADS_FOLDER, path.normalize(folder).replace(/^(\.\.(\/|\\|$))+/, '') + '/');
    await fse.ensureDir(dir);
    console.log(dir)
    return dir;
};
