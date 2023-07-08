const { Router } = require('express');
const router = Router();
const controllerMovie = require('../controllers/movie-controller');


router.get('/', controllerMovie.findAllMovie );
router.post('/' , controllerMovie.addMovie );
router.get('/:id/detail', controllerMovie.findMovieById );
router.put('/:id/update', controllerMovie.updateMovie );
router.delete('/:id/delete', controllerMovie.deleteMovie );
router.get('/search', controllerMovie.searchMovie );

module.exports = router;
