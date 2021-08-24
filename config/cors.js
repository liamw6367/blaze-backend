let originsWhitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
    'http://localhost:4202',
    'http://localhost:4201',     //this is my front-end url for development,
];
let corsOptions = {
    origin: function (origin, callback) {
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

module.exports = corsOptions;
