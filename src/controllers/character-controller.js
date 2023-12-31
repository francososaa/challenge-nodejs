const CharacterService = require("../services/character-service");

const findAllCharacter = async (req, res) => {

    const character = await CharacterService.listAll();
    if ( !character ) return res.status(404).send({ message: error.message });

    return res.send({ message: "Successfully found character", character });
};

const findCharacterById = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: "There is no id in the request" });

    try {
        const character = await CharacterService.detailCharacter(id);
        if ( !character ) return res.status(404).send({ message: "Does not exist character" });

        return res.send({ message: "Success", character });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const addCharacter = async (req, res) => {
    const body = req.body;
    if ( !body ) return res.status(500).send({ message: "No data in the body" });

    try {
        const character = await CharacterService.create(body);
        return res.status(201).send({ message: "Character created successfully", character });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

const updateCharacter = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if ( !id || !body ) return res.status(500).send({ message: "There is no id or body in the request" });

    try {
        const character = await CharacterService.findCharacterById(id);
        if ( !character ) return res.status(404).send({ message: "Character not found" });

        const characterUpdate = await CharacterService.update(character, body);
        return res.send({ message: "Character updated successfully", character: characterUpdate });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const deleteCharacter = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: "There is no id in the request" });

    try {
        const character = await CharacterService.findCharacterById(id);
        if ( !character)  return res.status(404).send({ message: "Character not found" });

        const characterDestroy = await CharacterService.delete(character);
        return res.send({ message: "Character removed successfully", character: characterDestroy });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const searchCharacterByFilter = async (req, res) => {
    
    const character = await CharacterService.findByNameAndMovieOrAge(req.query);
    if ( character.length === 0 ) return res.status(404).send({ message: "The character was not found with the requested data"});
    
    return res.send({ message: "Successful search", character });
};

module.exports = {
    addCharacter,
    deleteCharacter,
    findAllCharacter,
    findCharacterById,
    searchCharacterByFilter,
    updateCharacter,
};
