const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');


const listAll = async () => {
    return await Movie.findAll({
        where: { status: true },
        attributes: ["tittle", "image", "creationDate"]
    });
};

const findOne = async (movieID) => {
    return await Movie.findOne({
        where: {
            [Op.and]: [
                { id: movieID },
                { status: true }
            ]
        }
    });
};

const detailMovie = async (movieID) => {
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

const create = async (dataMovie) => {
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

const update = async (dataMovie, body) => {
    dataMovie.update(body);
    return await dataMovie.save();
};

const deleteMovie = async (dataMovie) => {
    dataMovie.status = false;
    return await dataMovie.save();
};

const findMovie = async (query) => {

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


module.exports = {
    create,
    deleteMovie,
    detailMovie,
    findMovie,
    findOne,
    listAll,
    update
};
