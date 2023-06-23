const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');

const create = async ( dataMovie ) => {
    const movie = Movie.create({
        tittle: dataMovie.tittle,
        img: dataMovie.img,
        qualification: dataMovie.qualification,
        genres: [
            {
                name: dataMovie.genre.name
            }
        ]
    }, {
        include: Genre
    });

    await movie.save();
    return movie;
};

const findAll = async () => {
    const movie = await Movie.findAll({
        where: { status: true },
        attributes: [ "tittle","img","creation_date"],
        include: [
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    });
    return movie;
};

const findOneDetail = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        include: [
            {
                model: Genre,
                attributes: ["name"]
            },
            {
                model: Character,
                attributes: ["name","age"]
            }
        ]
    } );
    return movie;
};

const findOne = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        include: [
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    } );
    return movie;
};

const update = async ( dataMovie, body ) => {
    dataMovie.tittle = body.tittle;
    dataMovie.img = body.img;
    dataMovie.creation_date = body.creation_date,
    dataMovie.qualification = body.qualification,
    dataMovie.status = body.status;


    await dataMovie.save();
    return dataMovie;
};

module.exports = {
    create,
    findAll,
    findOneDetail,
    findOne,
    update
};
