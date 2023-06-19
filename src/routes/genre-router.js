const { Router } = require('express');
const router = Router();
const controller = require('../controllers/genre-controller');
const validarJWT = require('../middlewares/validar-jwt');


router.get('/', controller.listGenre );
router.post('/' , controller.createGenre );
router.get('/detail/', controller.listGenreById );
router.put('/update/', controller.updateGenre );
router.delete('/delete/', controller.deleteGenre );

module.exports = router;
