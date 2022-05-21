const Product = require('../models/Product');
const Category = require('../models/Catagorys');


const getProducts = async (req, res) => {
    const limit = req.query.limit || 200;
    const products = await Product.find().populate('category').limit(limit);
    res.status(200).json(products);
};


const createProduct = async (req, res) => {
    try {
        const product = req.body;

        const idCategory = await Category.findOne({ name: product.category });

        const images = req.files.map(file => "/images/products/" + file.filename);

        if (!idCategory) throw new Error('Category not found');

        const newProduct = new Product({
            category: idCategory._id,
            name: product.name,
            description: product.description,
            marca: product.marca,
            purchasePrice: product.purchasePrice,
            salePrice: product.salePrice,
            colors: product.colors,
            materials: product.materials,
            stock: product.stock,
            status: product.status,
            images,
            sizes: product.sizes,
            plataform: product.plataform,
        });

        const productSave = await newProduct.save();

        res.status(200).json(productSave);
    }
    catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
};


const getProductByName = async (req, res) => {
    const { name } = req.params;
    const product = await Product.find({ name: {
        $regex: name,
        $options: 'i'
    } }).populate('category');
    res.status(200).json(product);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');
    res.status(200).json(product);
};

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    getProductByName,
    getProductById
};