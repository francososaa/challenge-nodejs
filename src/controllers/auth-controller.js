const bcryptjs = require('bcryptjs');
const generateToken = require('../helpers/generar-jwt');
const User = require('../models/user');

const login = async ( req, res ) => {

    const { email, password } = req.body;

    if (!email | !password) return res.status(400).send({ error: 'email and password are mandatory' })
    
    try {
        const user = await User.findOne( { email } );
        if( !user ) return res.status(400).send({ status: 400, message: 'User does not exist' });

        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) return res.status(400).send({ status: 400, message: 'Password is incorrect' });

        const token = await generateToken( user.id );
        return res.send({ 
            message: 'Successfully logged in',
            user,
            token 
        });

    } catch (error){ 
        return res.status(500).send( { status: 500, message: 'Talk to the administrator' } );
    }
}

const authRegister = async (req, res) => {
    const { name, email, password } = req.body

    if (!name | !email | !password) return res.status(400).json({ error: 'name, email and password are mandatory' })
    
    try {
        const user = await User.create({
            name,
            email,
            password
        })

        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(body.password, salt);
        await user.save();

        const token = await generateToken(user.id);
        return res.status(201).send({
            message: 'Successfully Registered',
            user,
            token
        })

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

 module.exports = {
    authRegister,
    login
};
