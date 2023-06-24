const service = require('../services/movie-service');


const listMovie = async (req,res) => {
    try {
        const movie = await service.listAll();
        return res.send({ movie });
    } catch(error) {
        return res.status(404).send({ message: error.message});
    }
};

const listMovieById = async (req,res) => {
    const { id }  = req.query;

    try {
        const movie = await service.findOneDetail( id );
        return res.send({ message: 'Success', movie: movie });
    } catch (error) {
        return res.status(404).send({ message: 'Movie does not exist' })
    }
};

const createMovie = async (req,res) => {
    const body = req.body;

    if ( !body ) return res.status(500).send({ msg: 'The request must have a title, image and qualification' });

    try {
        const movie = await service.create( body );
        return res.status(201).send({
            msg: 'Movie created successfully',
            movie: movie
        });
    } catch(error) {
        return res.status(500).send({ msg: error.message });
    }
}

const updateMovie = async (req,res) => {
    const { id }  = req.query;
    const body = req.body;

    try {
        const movie = await service.findOne( id );
        const movieUpdate = await service.update( movie, body );
        return res.send({  message: 'Movie updated successfully', movie: movieUpdate });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

const deleteMovie = async (req,res) => {
    const { id } = req.query;

    try {
        const movie = await service.findOne( id );
        movie.status = false;
        await movie.save();
        return res.send({ message: 'Movie removed successfully', movie: movie });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

const searchMovie = async (req,res) => {
    const { name, genre, order } = req.query;

    try {
        const movie = await service.findMovie( name, genre, order );
        return res.send({ message: 'Successful search', movie: movie });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

module.exports = {
    createMovie,
    listMovie,
    listMovieById,
    updateMovie,
    deleteMovie,
    searchMovie
};
