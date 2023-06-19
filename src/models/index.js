require('dotenv').config();
const Character = require('./character');
const Genre = require('./genre');
const Movie = require('./movie');
const User = require('./user');


async function dbConfig( db, options = {} ) {

    try {
        await db.authenticate();

        Character.belongsToMany(Movie, { through: 'CharacterMovie' });
        Movie.belongsToMany(Character, { through: 'CharacterMovie' });
        
        Genre.hasMany(Movie, { onDelete: 'CASCADE' });
        Movie.belongsTo(Genre, { onDelete: 'CASCADE' });
    
        if( options.mockdata === 'true' ){
            mockData(db)
        } else {
            db.sync()
        }

        console.log(('Connected to database successfully'));
    } catch(error){
        console.log('Could not connect to database'); 
    }

    async function mockData( db ){

        await db.sync({ force: true });
        const genre = await Genre.bulkCreate([
            { name : 'aventure', status: true},
            { name : 'childish', status: true},
            { name : 'animation', status: true}
        ]);

    }

}

module.exports = dbConfig;
