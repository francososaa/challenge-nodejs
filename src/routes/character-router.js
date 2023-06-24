const { Router } = require('express');
const router = Router();
const controller = require('../controllers/character-controller');


router.get('/');
router.post('/' , controller.createCharacter );
router.get('/:id/list');
router.put('/:id/update');
router.delete('/:id/delete');

module.exports = router;
