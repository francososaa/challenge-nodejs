const Genre = require('../models/genre');

const create =  async ( nameGenre, imageGenre ) => {
    const genre = await Genre.create({ 
            name: nameGenre, 
            image: imageGenre 
    });

    await genre.save();
    return genre;
};

const findAll = async () => {
    return await Genre.findAll({ where: { status: true }});
};

const findOne = async ( idGenre ) => {
    return await Genre.findByPk( idGenre ); 
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
