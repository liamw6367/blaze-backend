require('dotenv').config();

const express = require('express');
const app = express();
const compression = require('compression');
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cs = require('./config/constants');
const postMaxSize = 50;

console.log(`Your port is ${port}`);

server.listen(port);

// Compress all HTTP responses
app.use(compression());

//Body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: postMaxSize + 'mb'}));

// Cors
app.use(cors(require('./config/cors')));


app.use('/test', function (req, res, next) {
    res.send('API is working properly');
});

app.use('/test-stores', (req, res) => {
    let data = [{
        name: "All",
        area: "Some",
        latitude: "19.546545454545465465612",
        longitude: "72.546545454545465465612",
        deliveryRadius: "2",
        storeTiming: "8am",
        contactPersonName: "Aziz Tinwala",
        contactNumber: "+12345678912778",
        blazePersonName: "Aziz Tinwala",
        blazePersonNumber: "",
        address: "Vasai East",
        storeEmailId: "all@all.com",
        password: "123456",
        isActive: true,
    },
        {
            name: "Funny Store",
            area: "Some",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12345678912778",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "example@example.com",
            password: "123456",
            isActive: true,
        },
        {
            name: "Cornucopia",
            area: "Place",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12345555444312",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "test@test.com",
            password: "123456",
            isActive: true,
        },
        {
            name: "The Corner Store",
            area: "Bandra",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12366500893123",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "instance@instance.com",
            password: "123456",
            isActive: false,
        },
        {
            name: "Drinks",
            area: "Something",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12345678912778",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "ample@ample.com",
            password: "123456",
            isActive: false,
        },
        {
            name: "The best shop",
            area: "any place",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12345555444312",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "task@task.com",
            password: "123456",
            isActive: true,
        },
        {
            name: "The Circle Store",
            area: "Bandra",
            latitude: "19.546545454545465465612",
            longitude: "72.546545454545465465612",
            deliveryRadius: "2",
            storeTiming: "8am",
            contactPersonName: "Aziz Tinwala",
            contactNumber: "+12366500893123",
            blazePersonName: "Aziz Tinwala",
            blazePersonNumber: "",
            address: "Vasai East",
            storeEmailId: "inst@inst.com",
            password: "123456",
            isActive: true,
        }];
    res.send(data)
})

// Non-auth routes
app.use('/auth', require('./routes/auth'));
app.use('/stores', require('./routes/stores'));

// Auth Routes

let distFront = path.join(__dirname, 'dist_front/');
let distAdmin = path.join(__dirname, 'dist_admin/');
//
// Static resources
app.use(express.static(distFront));
app.use(express.static(distAdmin));
app.use('/uploads/', express.static(cs.UPLOADS_FOLDER));

// Separating Angular routes
app.get('*', (req, res, next) => {
    if (req.url.includes('Admin')) {
        console.log(distAdmin + 'index.html')
        res.sendFile(distAdmin + 'index.html');
    } else {
        console.log(distFront + 'index.html')
        // res.status(404).send('Not found');
        res.sendFile(distFront + 'index.html');
    }
});

// Passport.js config
// const passport = require('passport');
// require('./config/google-passport-strategy')(passport);
// require('./config/facebook-passport-strategy')(passport);
// app.use(passport.initialize({}));
