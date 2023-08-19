const Genre = require('../models/genre');
const Movie = require('../models/movie');
const { Op } = require('sequelize');

const create =  async ( dataGenre) => {
    const genre = await Genre.create( dataGenre );

    await genre.save();
    return genre;
};

const findAll = async () => {
    return await Genre.findAll({ where: { status: true }, attributes: { exclude: ["status"] }});
};

const findOne = async ( idGenre ) => {
    return await Genre.findOne({
        where: {
            [Op.and]: [
                { id: idGenre },
                { status: true }
            ]
        }
    });
};

const update = async ( dataGenre, body  ) => {
    dataGenre.set(body);
    await dataGenre.save();
    return dataGenre;
};

const eliminarGenre = async ( dataGenre ) => {
    dataGenre.status = false;
    await dataGenre.save();
    return dataGenre;
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    eliminarGenre
};
