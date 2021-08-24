//Nos traemos aqui los archivos de todas las rutas.
const { Router } = require('express');
const router = Router();


// **Cuando exportas por default sin llaves, sino con llaves. Tambien con llaves cuando es una palabra reservada 
// de la libreria.

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes');
const create = require('./create');
const types = require('./types');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/create', create);
router.use('/recipes', recipes);
router.use('/types', types);

module.exports = router;
