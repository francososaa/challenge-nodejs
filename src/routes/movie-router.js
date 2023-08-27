const { Router } = require('express');
const router = Router();
const controllerMovie = require('../controllers/movie-controller');
const {  validarJWT } = require('../middlewares/validar-jwt');

router.get('/', controllerMovie.findAllMovie );
router.post('/' , controllerMovie.addMovie );
router.get('/detail/:id', controllerMovie.findMovieById );
router.put('/update/:id',  controllerMovie.updateMovie );
router.delete('/delete/:id',  controllerMovie.deleteMovie );
router.get('/search', controllerMovie.searchMovie );

module.exports = router;
