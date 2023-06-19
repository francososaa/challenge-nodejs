const { Router } = require('express');
const router = Router();
const { createGenre } = require('../controllers/genre-controller');
const validarJWT = require('../middlewares/validar-jwt');


router.get('/');
router.post('/' , createGenre );
router.get('/:id/list');
router.put('/:id/update');
router.delete('/:id/delete');

module.exports = router;
