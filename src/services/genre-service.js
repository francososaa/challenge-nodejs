const GenreRepository = require('../repository/genre.repository');

class GenreService {

    constructor(){};

    async findAll(){    
        return await GenreRepository.findAll();
    };

    async findGenreById(GenreID){
        return await GenreRepository.findOne(GenreID);
    };
    
    async create(dataGenre){
        return await GenreRepository.create(dataGenre);
    };

    async update(dataGenre, body){
        return await GenreRepository.update(dataGenre, body);
    };

    async delete(dataGenre){
        return await GenreRepository.delete(dataGenre);
    };

};

module.exports = new GenreService();

