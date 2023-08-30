const { Router } = require('express');
const router = Router();
const controllerMovie = require('../controllers/movie-controller');
const {  validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, controllerMovie.findAllMovie );
router.post('/', validarJWT, controllerMovie.addMovie );
router.get('/detail/:id', validarJWT, controllerMovie.findMovieById );
router.put('/update/:id', validarJWT, controllerMovie.updateMovie );
router.delete('/delete/:id', validarJWT, controllerMovie.deleteMovie );
router.get('/search', validarJWT, controllerMovie.searchMovie );

module.exports = router;
