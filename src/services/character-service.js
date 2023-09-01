const CharacterRepository = require('../repository/character.repository');


class CharacterService {

    constructor(){};

    async listAll(){
        return await CharacterRepository.listAll();
    };
    
    async findCharacterById(CharacterID){
        return await CharacterRepository.findOne(CharacterID);
    };

    async detailCharacter(CharacterID){
        return await CharacterRepository.detailCharacter(CharacterID);
    };

    async create(dataCharacter){
        return await CharacterRepository.create(dataCharacter);
    };

    async update(dataCharacter, body){
        return await CharacterRepository.update(dataCharacter, body);
    };

    async delete(dataCharacter){
        return await CharacterRepository.delete(dataCharacter);
    };

    async findByNameAndMovieOrAge(query){
        return await CharacterRepository.findCharacter(query);
    };

};

module.exports = new CharacterService();

