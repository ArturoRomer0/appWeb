const { Schema, model } = require('mongoose');

const historialSchema = new Schema({
    purchasedproducts: [
        {
            idproduct: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Historial', historialSchema);