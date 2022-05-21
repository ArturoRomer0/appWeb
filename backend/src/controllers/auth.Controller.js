const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).populate('role');

    if (!user) return res.status(404).json({ token: null, message: 'Usuario no encontrado' });

    const matchpassword = await UserModel.comparePassword(password, user.password);

    if (!matchpassword) return res.status(404).json({ token: null, message: 'Contraseña incorrecta' });

    const tokenSecret = process.env.TOKEN_SECRET;
    const token = jwt.sign({ user: user._id, role: user.role.name }, tokenSecret, { expiresIn: 86400 });

    res.status(200).json({ token });
}

const signup = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    const verifyEmail = await UserModel.findOne({ email });

    if (verifyEmail) return res.status(404).json({ token: null, message: 'El usuario ya existe' });

    const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: await UserModel.encryptPassword(password)
    });

    if (role) {
        const idRole = await Role.findOne({ name: role });
        if (!idRole) return res.status(404).json({ token: null, message: 'Rol no encontrado' });
        newUser.role = idRole._id;
    } else {
        const role = await Role.findOne({ nombre: 'User' });
        newUser.role = role._id;
    }

    const userSave = await newUser.save();

    const tokenSecret = process.env.TOKEN_SECRET;

    const token = jwt.sign({ user: userSave._id }, tokenSecret, { expiresIn: 86400 });

    res.status(200).json({ token });
};


module.exports = {
    signin,
    signup
};
