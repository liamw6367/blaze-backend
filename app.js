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
const cron = require('node-cron');

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

// Socket io
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const {socket} = require('./helpers/socket');
socket(io);

// Mongoose
//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = `mongodb://${process.env.MONGO_IP_PORT}/metltv_chat`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(t=>{
    console.log(mongoose.connection.readyState)
    console.log('mongo connected')
});

app.set('trust proxy', true);

// Non-auth routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/stores', require('./routes/stores'));
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/banners', require('./routes/banners'));
app.use('/orders', require('./routes/orders'));
app.use('/delivery-fee', require('./routes/delivery_fee'));
app.use('/chat', require('./routes/chat'));

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
    if (req.url.includes('admin')) {
        // console.log(distAdmin + 'index.html')
        res.sendFile(distAdmin + 'index.html');
    } else {
        // console.log(distFront + 'index.html')
        // res.status(404).send('Not found');
        res.sendFile(distFront + 'index.html');
    }
});

// Passport.js config
// const passport = require('passport');
// require('./config/google-passport-strategy')(passport);
// require('./config/facebook-passport-strategy')(passport);
// app.use(passport.initialize({}));


//Cron job for chat messages
// cron.schedule('00 18 * * *', async() => {
//
// });