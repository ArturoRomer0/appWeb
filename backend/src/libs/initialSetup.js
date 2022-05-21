const Category = require('../models/Catagorys');
const Role = require('../models/Role');

(async () => {
    try {
        const count = await Category.estimatedDocumentCount();
        if (count > 0) {
            return;
        }
        await Promise.all([
            new Category({name: 'Juegos',}).save(),
            new Category({name: 'Juguetes',}).save(),
            new Category({name: 'Accesorios',}).save(),
            new Category({name: 'Computadoras',}).save(),
        ]);
    }
    catch (err) {
        console.log(err);
    }
})();


(async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        if (count > 0) {
            return;
        }
        await Promise.all([
            new Role({name: 'Admin',}).save(),
            new Role({name: 'User',}).save(),
        ]);
    }catch(e){
        console.log(e);
    }
})(); 