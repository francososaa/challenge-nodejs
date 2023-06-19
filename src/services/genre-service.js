const Genre = require('../models/genre');

const create =  async ( nameGenre ) => {
    const genre = await Genre.create({ name: nameGenre });

    await genre.save();
    return genre;
};


module.exports = {
    create,

};
