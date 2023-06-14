const { Router } = require('express');
const { login, authRegister } = require('../controllers/auth-controller');
const router = Router();

// PATH
router.post('/login', login );
router.post('/register', authRegister );

module.exports = router;
