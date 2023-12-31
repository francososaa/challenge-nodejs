const GenreService = require("../services/genre-service");


const findAllGenre = async (req,res) => {

    const genre = await GenreService.findAll();
    if ( !genre ) return res.status(500).send({ message: error.message });
    
    return res.send({ message: "Success found genre", genre });
};

const listGenreById = async (req,res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: "There is no id in the request" });

    try {
        const genre = await GenreService.findGenreById(id);
        if ( !genre ) return res.status(404).send({ message: "Does not exist genre" });

        return res.send({ message: "Success", genre });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

const addGenre = async (req,res) => {
    const body = req.body;
    if ( !body ) return res.status(500).send({ message: "No data in the body" })

    try {
        const genre = await GenreService.create(body);
        return res.status(201).send({ message: "Genre created successfully", genre });
    } catch(error) {
        return res.status(400).send({ message: error.message });
    }
};

const updateGenre = async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    if ( !id || !body ) return res.status(500).send({ message: "There is no id or body in the request" });

    try {
        const genre = await GenreService.findGenreById(id);
        if( !genre ) return res.status(404).send({ message: "Genre does not exist" });
        
        const genreUpdate = await GenreService.update(genre, body);
        return res.send({  message: "Genre updated successfully", genre: genreUpdate });
    } catch (error) {
        return res.status(400).send({ message: error.parent.stack })
    }
};

const deleteGenre = async (req,res) => {
    const id = req.params.id;
    if ( !id ) return res.status(500).send({ message: "There is no id in the request" });

    try {
        const genre = await GenreService.findGenreById(id);
        if ( !genre ) return res.status(404).send({ message: "Genre not found" });

        const destoyGenre = await GenreService.delete(genre);
        return res.send({ message: "Genre removed successfully", genre: destoyGenre });
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

module.exports = {
    addGenre,
    deleteGenre,
    findAllGenre,
    listGenreById,
    updateGenre,
};
