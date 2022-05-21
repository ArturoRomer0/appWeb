const UserModel = require('../models/User');

const getUserById = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await UserModel.findById(id, { password: 0 });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};



module.exports = {
    getUserById
};