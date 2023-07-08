const Character = require('../models/character');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { Op } = require('sequelize');


const create = async ( dataCharacter ) => {
    const character = await Character.create({
        name : dataCharacter.name,
        image : dataCharacter.image,
        age : dataCharacter.age,
        weight : dataCharacter.weight,
        history : dataCharacter.history,
        status : dataCharacter.status, 
    });

    await character.save();
    return character;
};

const listAll = async () => {
    return await Character.findAll({
        where: { status: true },
        attributes: [ "name","image"],
        limit: 5,
        offset: 5
    });
};

const findOneDetail = async ( idCharacter ) => {
    const character = await Character.findByPk( idCharacter, {
        include: [
            {
                model: Movie,
                attributes: ["tittle","creationDate"],
                include: [
                    {
                        model: Genre,
                        attributes: ["name"]
                    },
                ]
            },
        ]
    } );

    if ( character.status === true ) return character;
    return null;
};

const findOne = async ( idCharacter ) => {
    const character = await Character.findByPk( idCharacter, {
        include: [
            {
                model: Movie
            }
        ]
    });
    
    if ( character.status === true ) return character;
    return null;
};

const update = async ( dataCharacter, body ) => {
    
    dataCharacter.name = body.name;
    dataCharacter.image = body.image;
    dataCharacter.age = body.age,
    dataCharacter.weight = body.weight,
    dataCharacter.history = body.history,
    dataCharacter.status = body.status;

    await dataCharacter.save();
    return dataCharacter;
};

const findCharacter = async ( query ) => {
    const { name, age, weight, idMovies } = query;
    let queryToFind = {};

    if ( name ) queryToFind.name = name;
    if ( age ) queryToFind.age = age;
    if ( weight ) queryToFind.weight = weight;
    if ( idMovies ) queryToFind.idMovies = idMovies;

    return await Character.findAll({
        where: queryToFind,
        order: [
            ["ASC"]
        ],
        limit: 5,
        offset: 2
    });

};

module.exports = {
    create,
    listAll,
    findOneDetail,
    findOne,
    update,
    findCharacter
}

// const findCharacter = async ( nameCharacter, age, weight, movies ) => {
//     const character = await Character.findAll({
//         where: {
//             [Op.and]: [
//                 {
//                     name : {
//                         [Op.substring]: nameCharacter
//                     }
//                 },
//                 {  
//                     [Op.or]: [
//                         {
//                             age: {
//                                 [Op.eq]: age
//                             } 
//                         },
//                         {
//                             weigth: {
//                                 [Op.eq]: weight
//                             } 
//                         }
//                     ]
//                 }  
//             ]
//         },
//         order: [
//             ["age", "ASC"]
//         ],
//         limit: 5,
//         offset: 2
//     });

//     return character;
// };