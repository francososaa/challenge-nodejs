const Movie = require('../models/movie');

const create = async ( body ) => {
    const movie = Movie.create({
        tittle: body.tittle,
        img: body.img,
        qualification: body.qualification
    });

    await movie.save();
    return movie;
};

module.exports = {
    create
};
