const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const { Op } = require('sequelize');

const create = async ( dataMovie ) => {
    const movie =  await Movie.create({
        tittle: dataMovie.tittle,
        image: dataMovie.image,
        creationDate: dataMovie.creationDate,
        qualification: dataMovie.qualification,
        genreId: Genre
    });

    await movie.save;
    return movie;
};

const listAll = async () => {
    return await Movie.findAll({
        where: { status: true },
        attributes: [ "tittle","image","creationDate"]
    });
};

const findOneDetail = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        attributes: { exclude: ["status"] },
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            },
            {
                model: Character,
                through: {
                    attributes: []
                }
            }
        ]
    });
    if( movie.status === true) return movie;
    return null;
};

const findOne = async ( idMovie ) => {
    const movie = await Movie.findByPk( idMovie, {
        attributes: { exclude: ["genreId"] },
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        ]
    });

    if ( movie.status === true ) return movie;
    return null;
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
    const { name, genre, order = 'ASC' } = query;
    let queryToFind = {};
    
    if( name ) queryToFind.name = name;
    if ( genre ) queryToFind.genre = genre;
    
    return await Movie.findAll({
        where: queryToFind,
        order: [
            ["creation_date", order]
        ],
        limit: 3,
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

// const findMovie = async ( nameMovie, genre , order = 'ASC' ) => {
//     const movie = await Movie.findAll({
//         where: {
//             [Op.and]: [
//                 {
//                     tittle : {
//                         [Op.substring]: nameMovie
//                     }
//                 },
//                 {  
//                     genreId: {
//                         [Op.eq]: genre
//                     } 
//                 }  
//             ]
//         },
//         order: [
//             ["creation_date", order]
//         ],
//         limit: 3,
//         offset: 2
//     });

//     return movie;
// };

