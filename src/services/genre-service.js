const Genre = require('../models/genre');
const { Op } = require('sequelize');


const findAll = async () => {
    return await Genre.findAll({ 
        where: { status: true }, 
        attributes: { exclude: ["status"] } 
    });
};

const findOne = async (GenreID) => {
    return await Genre.findOne({
        where: {
            [Op.and]: [
                { id: GenreID },
                { status: true }
            ]
        }
    });
};

const create =  async (dataGenre) => {
    const genre = await Genre.create(dataGenre);
    return await genre.save();
};

const update = async (dataGenre, body ) => {
    dataGenre.update(body);
    return await dataGenre.save();
};

const deleteGenre = async (dataGenre) => {
    dataGenre.status = false;
    return await dataGenre.save();
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteGenre
};
