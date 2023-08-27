const { Router } = require('express');
const router = Router();
const controller = require('../controllers/character-controller');
const {  validarJWT } = require('../middlewares/validar-jwt');

router.get('/',  controller.findAllCharacter );
router.post('/' , controller.addCharacter );
router.get('/detail/:id', controller.findCharacterById );
router.put('/update/:id',  controller.updateCharacter );
router.delete('/delete/:id', controller.deleteCharacter );
router.get('/search', controller.searchCharacter );

module.exports = router;
