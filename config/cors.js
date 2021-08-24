let originsWhitelist = [
    'http://localhost:4200',
    'http://localhost:4202',
    'http://localhost:4201',     //this is my front-end url for development,
    'http://68.183.36.96:80',
    'http://68.183.36.96',
    'http://secretsouth.ie/'
];
let corsOptions = {
    origin: function (origin, callback) {
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

module.exports = corsOptions;
