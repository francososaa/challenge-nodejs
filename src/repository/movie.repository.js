const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');


class MovieRepository {

    constructor(){};

    async listAll(){
        return await Movie.findAll({
            where: { status: true },
            attributes: ["tittle", "image", "creationDate"]
        });
    };
    
    async findOne(movieID){
        return await Movie.findOne({
            where: {
                [Op.and]: [
                    { id: movieID },
                    { status: true }
                ]
            }
        });
    };

    async detailMovieById(movieID){
        return await Movie.findOne({
            where: {
                [Op.and]: [
                    { id: movieID },
                    { status: true }
                ]
            },
            attributes: { exclude: ["status", "genreId"] },
            include: [
                {
                    model: Genre,
                    attributes: ["name"],
                    through:{ attributes: [] }
                },
                {
                    model: Character,
                    attributes: { exclude: ["status"] },
                    through:{ attributes: [] }
                }
            ]
        });
    };

    async create(dataMovie){
        const [ movie, create ] = await Movie.findOrCreate({
            where: { tittle: dataMovie.tittle },
            defaults: {
                image: dataMovie.image,
                creationDate: dataMovie.creationDate,
                qualification: dataMovie.qualification
    
            }
        });
    
        dataMovie.genreByMovie.forEach( async movie => {
            let [ newGenre, create ] = await Genre.findOrCreate({
                where: { name: movie.name },
                defaults: { image: movie.image }
            });
            newGenre.addMovies(movie);
        });
    
        return await movie.save;
    };

    async update(dataMovie, body){
        await dataMovie.update(body);
        return await dataMovie.save();
    };

    async delete(dataMovie){
        dataMovie.status = false;
        return await dataMovie.save();
    };

    async findMovie(query){
        return await Movie.findAll({
            where: {
                tittle : { [Op.substring]: query.name },
                status: true
            },
            attributes: { exclude: ["status","genreId"] },
            include: [
                {
                    model: Genre,
                    where: query.genre ? { id: { [Op.eq]: query.genre } } : false ,
                    attributes: ["name"],
                    through:{ attributes: [] }
                },
            ],
            order: [
                ["creationDate", query.order || "ASC"]
            ]
        });
    };

};

module.exports = new MovieRepository();



