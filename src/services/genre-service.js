const Genre = require('../models/genre');

const create =  async ( nameGenre ) => {
    const genre = await Genre.create({ name: nameGenre });

    await genre.save();
    return genre;
};

const findAll = async () => {
    const genre = await Genre.findAll({ where: { status: true }});
    return genre;
};

const findOne = async ( id ) => {
    const genre = await Genre.findByPk( id );
    return genre;
};

const update = async ( dataGenre, body ) => {
    dataGenre.name = body.name;
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
