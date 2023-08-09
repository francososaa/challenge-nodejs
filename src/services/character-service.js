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
        attributes: [ "name","image"]
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
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    },
                ],
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
    options.status = true;

    return await Character.findAll({
        where: options,
        attributes: { exclude: ["status"] },
        include: [
            {
                model: Movie,
                // where: { "tittle": { [Op.substring]: query.movies} },
                attributes: { exclude: ["id","status"] },
                through: {
                    attributes: []
                },
                include: [ 
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    },
                ],
            },
        ],
        order: [
            ["age","ASC"]
        ]
    });

};

module.exports = {
    create,
    findCharacter,
    findOne,
    findOneDetail,
    listAll,
    update
}
