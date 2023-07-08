const { Router } = require('express');
const router = Router();
const controller = require('../controllers/character-controller');


router.get('/', controller.findAllCharacter );
router.post('/' , controller.addCharacter );
router.get('/:id/detail', controller.findCharacterById );
router.put('/:id/update', controller.updateCharacter );
router.delete('/:id/delete', controller.deleteCharacter );
router.get('/search', controller.searchCharacter );

module.exports = router;
