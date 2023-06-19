const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async ( req, res, next ) => { 
    const token = req.header('authentication');
   
    if( !token ){ return res.status(401).json({ msj: 'You are not an authenticated user to make this request' }); }
 
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findByPk( uid );
        if ( !user ) return res.status(401).send({ msj: 'Token invalid - no user exists' }) 
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ msj: 'Invalid token' })
    }
    next();
};

module.exports = validarJWT;
