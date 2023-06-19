const service = require('../services/movie-service');


const createMovie = async (req,res) => {
    const body = req.body;

    if ( !body ) return res.status(500).send({ msg: 'The request must have a title, image and qualification' });

    try {
        const movie = service.create( body );
        return res.status(201).send({
            msg: 'Movie created successfully',
            movie
        });
    } catch(error) {
        return res.status(500).send({ msg: error.message });
    }
}

module.exports = {
    createMovie
};
