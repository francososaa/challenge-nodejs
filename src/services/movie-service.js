const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');

const create = async (dataMovie) => {
    const [ movie, create ] = await Movie.findOrCreate({
        where: { tittle: dataMovie.tittle },
        defaults: {
            image: dataMovie.image,
            creationDate: dataMovie.creationDate,
            qualification: dataMovie.qualification

        }
    });

    dataMovie.genreByMovie.forEach( async element => {
        let [ newGenre, create ] = await Genre.findOrCreate({
            where: { name: element.name },
            defaults: { image: element.image }
        });
        newGenre.addMovies(movie);
    });

    await movie.save;
    return movie;
};

const listAll = async () => {
    return await Movie.findAll({
        where: { status: true },
        attributes: ["tittle", "image", "creationDate"],
        include: {
            model: Genre,
            attributes: ["name"],
            through:{ attributes: [] }
        }
    });
};

const findOneDetail = async (idMovie) => {
    return await Movie.findOne({
        where: {
            [Op.and]: [
                { id: idMovie },
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

const findOne = async ( idMovie ) => {
    return await Movie.findOne({
        where: {
            [Op.and]: [
                { id: idMovie },
                { status: true }
            ]
        }
    });
};

const update = async ( dataMovie, body ) => {
    dataMovie.set(body)
    await dataMovie.save();
    return dataMovie;
};

const deleteMovie = async ( dataMovie ) => {
    dataMovie.status = false;
    await dataMovie.save();
    return dataMovie;
};

const findMovie = async ( query ) => {

    return await Movie.findAll({
        where: {
            tittle : { [Op.substring]: query.name },
            status: true
        },
        attributes: { exclude: ["status","genreId"] },
        include: [
            {
                model: Genre,
                where: { id: { [Op.eq]: query.genre } },
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
    findMovie,
    findOne,
    findOneDetail,
    listAll,
    update
};
