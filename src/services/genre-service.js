const Genre = require('../models/genre');
const { Op } = require('sequelize');

const create =  async ( body) => {
    const genre = await Genre.create({ 
            name: body.name, 
            image: body.image
    });

    await genre.save();
    return genre;
};

const findAll = async () => {
    return await Genre.findAll({ where: { status: true }});
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

const update = async ( dataGenre, body ) => {
    dataGenre.name = body.name;
    dataGenre.image = body.image;
    dataGenre.status = body.status;

    await dataGenre.save();
    return dataGenre;
};

module.exports = {
    create,
    findAll,
    findOne,
    update
};
