const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');

const create = async ( dataMovie ) => {
    const movie = await Movie.create({
        tittle: dataMovie.tittle,
        image: dataMovie.image,
        creationDate: dataMovie.creationDate,
        qualification: dataMovie.qualification,
    });

    await movie.save;
    return movie;
};

const listAll = async () => {
    return await Movie.findAll({
        where: { status: true },
        attributes: ["tittle", "image", "creationDate"],
        limit: 5,
        offset: 5
    });
};

const findOneDetail = async ( idMovie ) => {
    return await Movie.findOne({
        where: {
            [Op.and]: [
                { id: idMovie },
                { status: true }
            ]
        },
        attributes: { exclude: ["status"] },
        include: [
            // {
            //     model: Movie,
            //     attributes: ["name"],
            //     through: {
            //         attributes: []
            //     }
            // },
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

    dataMovie.tittle = body.tittle;
    dataMovie.image = body.image;
    dataMovie.creationDate = body.creationDate,
    dataMovie.qualification = body.qualification,
    dataMovie.status = body.status;

    await dataMovie.save();
    return dataMovie;
};

const findMovie = async ( query ) => {
    let options = {};
    if ( query.name ) options.tittle = { [Op.substring]: query.name };
    if ( query.qualification ) options.qualification = {[Op.eq]: query.qualification};

    return await Movie.findAll({
        where: options,
        order: [
            ["creationDate", query.order || "ASC"]
        ],
        limit: 10,
        offset: 2
    });
};


module.exports = {
    create,
    listAll,
    findOneDetail,
    findOne,
    findMovie,
    update
};
