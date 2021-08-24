const {validationResult} = require('express-validator');
module.exports = (req, res, err = '') => {

    // Gets file type validation error
    if (req.fileTypeError) {
        res.status(423).json(req.fileTypeError);
        return true;
    }

    // Getting multer errors if any
    else if (err) {
        res.status(423).json(err);
        return true;
    }

    // If file validation passed, heading to the request data validation
    else {

        // Getting validation result from express-validator
        const errors = validationResult(req);

        // Handling database connection error
        if (!errors.isEmpty()) {
            let singleError = errors.array()[0];
            if (singleError.hasOwnProperty('msg') && singleError.msg.includes('ECONNREFUSED 127.0.0.1:3306')) {
                // singleError = 'Please check db connection';
                return res.status(422).json({db_error: singleError});
            } else {
                // console.log(singleError)
                return res.status(422).json(singleError);
            }
            // return true;
        }
    }
    return false;

};
