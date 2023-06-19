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

module.exports = {
    createGenre
};
