const service = require('../services/movie-service');


const findAllMovie = async (req, res) => {

    const movie = await service.listAll();
    if ( !movie ) return res.status(404).send({ message: error.message });

    return res.send({ message: 'Success found movie', movie });
};

const findMovieById = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: 'There is no id in the request' });

    try {
        const movie = await service.findOneDetail(id);
        if ( !movie ) return res.status(404).send({ message: 'Does not exist movie' });

        return res.send({ message: 'Success', movie: movie });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};


const addMovie = async (req, res) => {
    const body = req.body;
    if ( !body ) return res.status(500).send({ message: 'No data in the body' });

    try {
        const movie = await service.create(body);
        return res.status(201).send({
            msg: 'Movie created successfully',
            movie: movie
        });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if ( !id || !body ) return res.status(500).send({ message: 'There is no id or body in the request' });

    try {
        const movie = await service.findOne(id);
        if ( !movie ) return res.status(404).send({ message: 'Movie not found' });

        const movieUpdate = await service.update(movie, body);
        return res.send({ message: 'Movie updated successfully', movie: movieUpdate });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: 'There is no id in the request' });

    try {
        const movie = await service.findOne(id);
        if ( !movie ) return res.status(404).send({ message: 'Movie not found' });
 
        const movieDestroy = await service.deleteMovie(movie);

        return res.send({ message: 'Movie removed successfully', movie: movieDestroy });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

const searchMovie = async (req, res) => {
    if ( req.query === {} ) return res.status(500).send({ message: error.message })

    const movie = await service.findMovie(req.query);
    return res.send({ message: 'Successful search', movie: movie });
}

module.exports = {
    addMovie,
    deleteMovie,
    findAllMovie,
    findMovieById,
    searchMovie,
    updateMovie
};
