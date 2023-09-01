const Genre = require('../models/genre');
const { Op } = require('sequelize');


class GenreRepository{

    constructor(){};  
    
    async findAll(){
        return await Genre.findAll({ 
            where: { status: true }, 
            attributes: { exclude: ["status"] } 
        });
    };

    async findOne(GenreID){
        return await Genre.findOne({
            where: {
                [Op.and]: [
                    { id: GenreID },
                    { status: true }
                ]
            }
        });
    };

    async create(dataGenre){
        const genre = await Genre.create(dataGenre);
        return await genre.save();
    };

    async update(dataGenre, body ){
        await dataGenre.update(body);
        return await dataGenre.save();
    };

    async delete(dataGenre){
        dataGenre.status = false;
        return await dataGenre.save();
    };

};

module.exports = new GenreRepository();
