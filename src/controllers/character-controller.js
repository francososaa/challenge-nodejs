const service = require('../services/character-service');

const findAllCharacter = async (req, res) => {

    const character = await service.listAll();
    if ( !character ) return res.status(404).send({ message: error.message });

    return res.send({ message: 'Successfully found character', character });
};

const findCharacterById = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: 'There is no id in the request' });

    try {
        const character = await service.findOneDetail(id);
        if ( !character ) return res.status(404).send({ message: 'Does not exist character' });
        return res.send({ message: 'Success', character: character });
    } catch (error) {
        return res.status(400).send({ message: error.mesage })
    }
};

const addCharacter = async (req, res) => {
    const body = req.body;
    if ( !body ) return res.status(500).send({ message: 'No data in the body' });

    try {
        const character = await service.create(body);
        return res.status(201).send({
            msg: 'Character created successfully',
            character: character
        });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

const updateCharacter = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if ( !id || !body ) return res.status(500).send({ message: 'There is no id or body in the request' });

    try {
        const character = await service.findOne(id);
        if ( !character ) return res.status(404).send({ message: 'Character not found' });

        const characterUpdate = await service.update(character, body);
        return  res.send({ message: 'Character updated successfully', character: characterUpdate });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const deleteCharacter = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: 'There is no id in the request' });

    try {
        const character = await service.findOne(id);
        if ( !character)  return res.status(404).send({ message: 'Character not found' });

        character.status = false;
        await character.save();
        return res.send({ message: 'Character removed successfully', character: character });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const searchCharacter = async (req, res) => {
    if ( !req.query ) return res.status(404).send({ message: error.message })

    const character = await service.findCharacter( req.query );
    return res.send({ message: 'Successful search', character: character });
};

module.exports = {
    addCharacter,
    deleteCharacter,
    findAllCharacter,
    findCharacterById,
    searchCharacter,
    updateCharacter,
};
