const { Router } = require('express');
const router = Router();
const controller = require('../controllers/movie-controller');


router.get('/', controller.listMovie );
router.post('/' , controller.createMovie );
router.get('/detail', controller.listMovieById );
router.put('/update', controller.updateMovie );
router.delete('/delete', controller.deleteMovie );

module.exports = router;
