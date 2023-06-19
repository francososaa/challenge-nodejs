const { Router } = require('express');
const router = Router();
const { createMovie } = require('../controllers/movie-controller');


router.get('/');
router.post('/' , createMovie );
router.get('/:id/list');
router.put('/:id/update');
router.delete('/:id/delete');

module.exports = router;
