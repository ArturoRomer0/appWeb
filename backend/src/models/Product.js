const { Schema, model } = require('mongoose');


const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    materials: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    images: {
        type: Array,
        required: true
    },
    sizes: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        depth: {
            type: Number,
            required: true
        }
    },
    plataform: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
});


module.exports = model('Product', productSchema);