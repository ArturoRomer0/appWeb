const Category = require('../models/Catagorys');



const getCategory = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

module.exports = {
    getCategory
};