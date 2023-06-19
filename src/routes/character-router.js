const { Router } = require('express');
const router = Router();
const { createCharacter } = require('../controllers/character-controller');


router.get('/');
router.post('/' , createCharacter );
router.get('/:id/list');
router.put('/:id/update');
router.delete('/:id/delete');

module.exports = router;
