const Character = require('../models/character');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { Op } = require('sequelize');


const listAll = async () => {
    return await Character.findAll({
        where: { status: true },
        attributes: ["name", "image"]
    });
};

const findOne = async (idCharacter) => {
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
                    attributes: ["name"],
                    through: { attributes: [] }
                },
                through: { attributes: [] }
            },
        ]
    });
};

const create = async (dataCharacter) => {

    const [newCharacter, create] = await Character.findOrCreate({
        where: { name: dataCharacter.name },
        defaults: {
            image: dataCharacter.image,
            age: dataCharacter.age,
            weight: dataCharacter.weight,
            history: dataCharacter.histor
        }
    });

    dataCharacter.movies.forEach(async element => {
        let [newMovie, create] = await Movie.findOrCreate({
            where: { tittle: element.tittle },
            defaults: {
                image: element.image,
                creationDate: element.creationDate,
                qualification: element.qualification
            }
        });
        newCharacter.addMovies(newMovie);
    });

    await newCharacter.save();
    return newCharacter;
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

    where.name = { [Op.substring]: query.name };
    where.status = true;
    if (query.age) where.age = query.age;
    if (query.weight) where.weight = query.weight;

    return await Character.findAll({
        where,
        attributes: { exclude: ["status"] },
        include: [
            {
                model: Movie,
                where: query.movies ? { id: { [Op.eq]: query.movies } } : false ,
                attributes: { exclude: ["genreId","status"] },
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
    listAll,
    update
}
