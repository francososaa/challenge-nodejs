const { Router } = require('express');
const router = Router();
const controllerGenre = require('../controllers/genre-controller');
const {  validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT, controllerGenre.listGenre );
router.post('/' , validarJWT, controllerGenre.createGenre );
router.get('/detail/:id', validarJWT, controllerGenre.listGenreById );
router.put('/update/:id', validarJWT,  controllerGenre.updateGenre );
router.delete('/delete/:id', validarJWT, controllerGenre.deleteGenre );

module.exports = router;