const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');

const create = async ( dataMovie ) => {
    const movie =  await Movie.create({
        tittle: dataMovie.tittle,
        img: dataMovie.img,
        creation_date: dataMovie.creation_date,
        qualification: dataMovie.qualification,
    });

    await movie.save;
    return movie;
};

const listAll = async () => {
    const movie = await Movie.findAll({
        where: { status: true },
        attributes: [ "tittle","img","creation_date"]
    });
    return movie;
};

const findOneDetail = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        attributes: { exclude: ["genreId","img","status"] },
        include: [
            {
                model: Genre,
                attributes: ["name"]
            },
            {
                model: Character
            }
        ]
    } );
    return movie;
};

const findOne = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        attributes: { exclude: ["genreId"] },
        include: [
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    });
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
    listAll,
    findOneDetail,
    findOne,
    update
};
