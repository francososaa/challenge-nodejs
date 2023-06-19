const service = require('../services/genre-service');


const createGenre = async (req,res) => {
    const name = req.body;

    try {
        const genre = await service.create( name );
        return res.status(201).send({
            msg: 'Genre created successfully',
            genre: genre
        });
    } catch(error) {
        return res.status(404).send({ message: error.message });
    }
};

const listGenre = async (req,res) => {

    try {
        const genre = await service.findAll();
        return res.send({ message: 'Success', genre: genre });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

const listGenreById = async (req,res) => {
    const { id }  = req.query;

    try {
        const genre = await service.findOne( id );
        return res.send({ message: 'Success', genre: genre });
    } catch (error) {
        return res.status(404).send({ message: 'Genre does not exist' })
    }
};

const updateGenre = async (req,res) => {
    const { id }  = req.query;
    const body = req.body;

    try {
        const genre = await service.findOne( id );
        const genreUpdate = await service.update( genre, body );
        return res.send({  message: 'Genre updated successfully', genre: genreUpdate });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

const deleteGenre = async (req,res) => {
    const { id } = req.query;

    try {
        const genre = await service.findOne( id );
        genre.status = false;
        await genre.save();
        return res.send({ message: 'Genre removed successfully', genre: genre });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

module.exports = {
    createGenre,
    listGenre,
    listGenreById,
    updateGenre,
    deleteGenre
};
