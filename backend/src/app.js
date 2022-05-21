const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
// inicializar express
const app = express();
require('./libs/initialSetup');

const pkg = require('../package.json');
// setting environment variables    
require('dotenv').config();
app.set('port', process.env.PORT);
console.log(app.get('port'));
console.log(process.env.MONGO_URI, process.env.TOKEN_SECRET);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images/products'),
    filename: (req, file, cb) => {
        cb(null, uuid()+ path.extname(file.originalname).toLowerCase());
    }
});

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/images/products')
}).array('images[]', 10));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.json({
        name: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version
    });
});
// Routes
app.use('/api', require('./routes/index'))

module.exports = app;