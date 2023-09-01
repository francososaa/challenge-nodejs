const Character = require('../models/character');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { Op } = require('sequelize');

class CharacterRepository {

    constructor() { };

    async listAll(){
        return await Character.findAll({
            where: { status: true },
            attributes: ["name", "image"]
        });
    };

    async findOne(CharacterID) {
        return await Character.findOne({
            where: {
                [Op.and]: [
                    { id: CharacterID },
                    { status: true }
                ]
            },
        });
    };

    async detailCharacter(CharacterID) {
        return await Character.findOne({
            where: {
                [Op.and]: [
                    { id: CharacterID },
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

    async create(dataCharacter) {
        const [newCharacter, create] = await Character.findOrCreate({
            where: { name: dataCharacter.name },
            defaults: {
                image: dataCharacter.image,
                age: dataCharacter.age,
                weight: dataCharacter.weight,
                history: dataCharacter.history
            }
        });
    
        dataCharacter.movies.forEach( async movie => {
            const [newMovie, create] = await Movie.findOrCreate({
                where: { tittle: movie.tittle },
                defaults: {
                    image: movie.image,
                    creationDate: movie.creationDate,
                    qualification: movie.qualification
                }
            });
            
            newCharacter.addMovies(newMovie);
        });
    
        return await newCharacter.save();
    };

    async update(dataCharacter, body) {
        await dataCharacter.update(body);
        return await dataCharacter.save();
    };

    async delete(dataCharacter) {
        dataCharacter.status = false;
        return await dataCharacter.save();
    };

    async findCharacter(query){
        let where = {};
    
        where.name = { [Op.substring]: query.name };
        where.status = true;
        if (query.age) where.age = query.age;
    
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
        });
        
    };
}

module.exports = new CharacterRepository();


