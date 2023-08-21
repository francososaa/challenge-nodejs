const Character = require('../models/character');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { Op } = require('sequelize');


// const create = async (dataCharacter) => {
//     const character = await Character.create({
//         dataCharacter,
//     });

//     await character.save();
//     return character;
// };

const create = async ( dataCharacter) => {

    const character = await Character.create({
        name: dataCharacter.name, 
        image: dataCharacter.image,
        age: dataCharacter.age,
        weight: dataCharacter.weight,
        history: dataCharacter.history,
        movies: [{
            tittle: dataCharacter.movies.tittle,
            image: dataCharacter.movies.image,
            creationDate: dataCharacter.movies.creationDate,
            qualification: dataCharacter.movies.qualification,
        }]
    }, {
        include: Movie
    });

    await character.save();
    return character;
};
const listAll = async () => {
    return await Character.findAll({
        where: { status: true },
        attributes: ["name", "image"]
    });
};

const findOneDetail = async (idCharacter) => {
    return await Character.findOne({
        where: {
            [Op.and]: [
                { id: idCharacter },
                { status: true }
            ]
        },
        attributes: { exclude: ["id", "status"] },
        include: [
            {
                model: Movie,
                attributes: ["tittle", "creationDate"],
                include: {
                    model: Genre,
                    attributes: ["name"]
                },
                through: {
                    attributes: []
                }
            },
        ]
    });
};

const findOne = async (idCharacter) => {
    return await Character.findOne({
        where: {
            [Op.and]: [
                { id: idCharacter },
                { status: true }
            ]
        }
    });
};

const update = async (dataCharacter, body) => {
    dataCharacter.set(body);
    await dataCharacter.save();
    return dataCharacter;
};

const deleteCharacter = async (dataCharacter) => {
    dataCharacter.status = false;
    await dataCharacter.save();
    return dataCharacter;
};

const findCharacter = async (query) => {
    let where = {};

    if (query.name) where.name = { [Op.substring]: query.name };
    if (query.age) where.age = query.age;
    if (query.weight) where.weight = query.weight;
    where.status = true;

    // if( !query.movies ){
    //     return await Character.findAll({
    //         where,
    //         attributes: { exclude: ["status"] },
    //         include: [
    //             {
    //                 model: Movie,
    //                 attributes: { exclude: ["id","genreId","status"] },
    //                 through: {
    //                     attributes: []
    //                 }
    //             },
    //         ],
    //         order: [
    //             ["age", "ASC"]
    //         ]
    //     });
    // }

    return await Character.findAll({
        where,
        attributes: { exclude: ["status"] },
        include: [
            {
                model: Movie,
                where: query.genre ? { "id":{[Op.eq]: query.genre} } : null  ,
                // where: { "id": { [Op.eq]: query.movies} },
                attributes: { exclude: ["id","genreId","status"] },
                through: {
                    attributes: []
                }
            },
        ],
        order: [
            ["age", "ASC"]
        ]
    })

};

module.exports = {
    create,
    deleteCharacter,
    findCharacter,
    findOne,
    findOneDetail,
    listAll,
    update
}
