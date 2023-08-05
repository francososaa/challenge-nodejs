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
        limit: 10,
        offset: 5
    });
};

const findOneDetail = async ( idCharacter ) => {
    return await Character.findOne({
        where: {
            [Op.and]: [
                { id: idCharacter },
                { status: true }
            ]
        },
        attributes: { exclude: ["status"] },
        include: [
            {
                model: Movie,
                attributes: ["tittle","creationDate"],
                through: {
                    attributes: []
                }
            },
        ]
    } );
};

const findOne = async ( idCharacter ) => {
    return await Character.findOne({
        where: {
            [Op.and]: [
                { id: idCharacter },
                { status: true }
            ]
        }
    });
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
    let options = {};

    if ( query.name ) options.name = { [Op.substring]: query.name };
    if ( query.age ) options.age = query.age;
    if ( query.weight ) options.weight = query.weight;
    if ( query.movies ) options.idMovies = query.movies;

    return await Character.findAll({
        where: options,
        order: [
            ["age","ASC"]
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
    update,
    findCharacter
}
