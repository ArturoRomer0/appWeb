const {Schema, model} = require('mongoose');
const bycript = require('bcryptjs');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bycript.genSalt(10);
    return await bycript.hash(password, salt);
};
userSchema.statics.comparePassword = async function (password, receivedpassword) {
    return await bycript.compare(password, receivedpassword);
};


module.exports = model('User', userSchema);