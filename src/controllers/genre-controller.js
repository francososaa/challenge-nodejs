const service = require('../services/genre-service');


const createGenre = async (req,res) => {
    const { name, image } = req.body;

    try {
        const genre = await service.create( name, image );
        return res.status(201).send({
            message: 'Genre created successfully',
            genre: genre
        });
    } catch(error) {
        return res.status(404).send({ message: error.message });
    }
};

const listGenre = async (req,res) => {

    const genre = await service.findAll();
    if ( !genre ) return res.status(404).send({ message: error.message });
    
    res.send({ message: 'Success', genre: genre });
};

const listGenreById = async (req,res) => {
    const id = req.params.id;

    try {
        const genre = await service.findOne( id );
        return res.send({ message: 'Success', genre: genre });
    } catch (error) {
        return res.status(404).send({ message: 'Genre does not exist' })
    }
};

const updateGenre = async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const genre = await service.findOne( id );
        if( !genre ) return res.status(500).send({ message: 'Genre does not exist' });

        const genreUpdate = await service.update( genre, body );
        return res.send({  message: 'Genre updated successfully', genre: genreUpdate });
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

const deleteGenre = async (req,res) => {
    const id = req.params.id;

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
