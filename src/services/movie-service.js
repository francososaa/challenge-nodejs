const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');

const create = async (dataMovie) => {
    const movie = await Movie.create(dataMovie);

    await movie.save;
    return movie;
};

const listAll = async () => {
    return await Movie.findAll({
        where: { status: true },
        attributes: ["tittle", "image", "creationDate"],
        include: {
            model: Genre,
            attributes: ["name"]
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
                attributes: ["name"]
            },
            {
                model: Character,
                attributes: { exclude: ["status"] },
                through: {
                    attributes: []
                }
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
    let where = {};
    if ( query.name ) where.tittle = { [Op.substring]: query.name };
    where.status = true;

    return await Movie.findAll({
        where,
        attributes: { exclude: ["status","genreId"] },
        include: [
            {
                model: Genre,
                where: { "id": { [Op.eq]: query.genre } },
                attributes: ["name"]
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
