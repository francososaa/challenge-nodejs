const service = require('../services/character-service');


const createCharacter = async (req,res) => {
    const body = req.body;

    if ( !body ) return res.status(500).send({ msg: '' });

    try {
        const character = service.create( body );
        return res.status(201).send({
            msg: 'Character created successfully',
            character
        });
    } catch(error) {
        return res.status(500).send({ msg: error.message });
    }
}

module.exports = {
    createCharacter
};
