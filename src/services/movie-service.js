const MovieRepository = require('../repository/movie.repository');


class MovieService {

    constructor(){};

    async listAll(){
        return await MovieRepository.listAll();
    };
    
    async findMovieById(MovieID){
        return await MovieRepository.findOne(MovieID);
    };

    async detailById(MovieID){
        return await MovieRepository.detailMovieById(MovieID);
    };

    async create(dataMovie){
        return await MovieRepository.create(dataMovie);
    };

    async update(dataMovie, body){
        return await MovieRepository.update(dataMovie, body);
    };

    async delete(dataMovie){
        return await MovieRepository.delete(dataMovie);
    };

    async findByNameAndGenre(query){
        return await MovieRepository.findMovie(query);
    };

};

module.exports = new MovieService();
