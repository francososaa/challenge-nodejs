const { Router } = require('express');
const router = Router();
const controller = require('../controllers/character-controller');
const {  validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, controller.findAllCharacter );
router.post('/', validarJWT, controller.addCharacter );
router.get('/detail/:id', validarJWT, controller.findCharacterById );
router.put('/update/:id', validarJWT,  controller.updateCharacter );
router.delete('/delete/:id', validarJWT, controller.deleteCharacter );
router.get('/search', validarJWT, controller.searchCharacterByFilter );

module.exports = router;
