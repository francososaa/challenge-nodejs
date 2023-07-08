const { Router } = require('express');
const router = Router();
const controllerGenre = require('../controllers/genre-controller');
const validarJWT = require('../middlewares/validar-jwt');


router.get('/', controllerGenre.listGenre );
router.post('/' , controllerGenre.createGenre );
router.get('/:id/detail', controllerGenre.listGenreById );
router.put('/:id/update', controllerGenre.updateGenre );
router.delete('/:id/delete', controllerGenre.deleteGenre );

module.exports = router;
