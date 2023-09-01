const Character = require('../models/character');
const Genre = require('../models/genre');
const Movie = require('../models/movie');
const User = require('../models/user');


async function dbConfig( db, options = {} ) {

    try {
        await db.authenticate();

        Character.belongsToMany(Movie, { through: 'Character_Movie' });
        Movie.belongsToMany(Character, { through: 'Character_Movie' });

        Genre.belongsToMany(Movie, { through: 'Genre_Movie' });
        Movie.belongsToMany(Genre, { through: 'Genre_Movie' });

        if ( options.mockdata === 'true') {
            mockData(db) 
        } else {
            db.sync();
        }    

        console.log(('Connected to database successfully'));
    } catch(error){
        console.log('Could not connect to database'); 
    }
};

async function mockData(db) {

    await db.sync({ force: true });
    await User.create(
        { name: 'micaela', email: 'micaela.velazco@yahoo.com', password: 'sosita03323'},
    );
    
    await Genre.bulkCreate(
        [
            { name: 'aventure', image: 'aventure.jpg', status: true },
            { name: 'childish', image: 'childish.jpg', status: true },
            { name: 'animation', image: 'animation.jpg', status: true },
            { name: 'tale', image: 'tale.jpg', status: true },
            { name: 'childrens literature', image: 'childrens literature.jpg', status: true },
            { name: 'science fiction', image: 'science fiction.jpg', status: true },
            { name: 'action', image: 'action.jpg', status: true },
            { name: 'crime', image: 'crime.jpg', status: true },
            { name: 'fancy', image: 'fancy.jpg', status: true },
            { name: 'super hero', image: 'super hero.jpg', status: true }
        ],
        {
            ignoreDuplicates: true,
        }
    );
  
    await Movie.bulkCreate(
        [
            { tittle: 'aladdin', image: 'aladdin.jpg', creationDate: '1992', qualification: 5, genreId: 1 },
            { tittle: 'la sirenita', image: 'la_sirenita.jpg', creationDate: '1989', qualification: 4, genreId: 3 },
            { tittle: 'universo de mickey mouse', image: 'universo_de_mickey_mouse.jpg', creationDate: '1928', qualification: 5, genreId: 4 },
            { tittle: 'spiderman', image: 'spiderman.jpg', creationDate: '1994', qualification: 5, genreId: 7 },
            { tittle: 'wanda vision', image: 'wanda_vision.jpg', creationDate: '2021', qualification: 3, genreId: 6},
            { tittle: 'guardianes de la galaxia', image: 'guardianes_de_la_galaxia.jpg', creationDate: '2014', qualification: 4, genreId: 9 },
            { tittle: 'loki', image: 'loki.jpg', creationDate: '2021', qualification: 4, genreId: 10 }
        ],
        {
            ignoreDuplicates: true
        }
    ); 

    await Character.bulkCreate(
        [
            { name: 'jasmine', image: 'jasmine.jpg', age: 30, weight: 55, history: 'es la protagonista' },
            { name: 'el genio', image: 'el_genio.jpg', age: 50, weight: 70, history: 'es el genio' },
            { name: 'aladdin', image: 'aladdin.jpg', age: 30, weight: 70, history: 'es el protagonista' },
            { name: 'sultan', image: 'sultan.jpg', age: 30, weight: 70, history: 'es el sultan' },
            { name: 'ariel', image: 'ariel.jpg', age: 30, weight: 50, history: 'es la protagonista' },
            { name: 'principe eric', image: 'principe_eric.jpg', age: 30, weight: 70, history: 'es el protagonista' },
            { name: 'el rey del mar', image: 'el_rey_del_mar.jpg', age: 60, weight: 75, history: 'es el rey del mar' },
            { name: 'ursula', image: 'ursula.jpg', age: 50, weight: 60, history: 'ella es ursula' },
            { name: 'sebastian', image: 'sebastian.jpg', age: 20, weight: 10, history: 'es el cangrejo' },
            { name: 'mickey mouse', image: 'mickey_mouse.jpg', age: 10, weight: 50, history: 'es micky mouse' },
            { name: 'minnie mouse', image: 'minnie_mouse.jpg', age: 10, weight: 45, history: 'es minnie mouse' },
            { name: 'pato donald', image: 'pato_donald.jpg', age: 10, weight: 40, history: 'es el pato donald' },
            { name: 'goofy', image: 'goofy.jpg', age: 10, weight: 30, history: 'es goofy' },
            { name: 'pluto', image: 'pluto.jpg', age: 10, weight: 40, history: 'es Pluto' },
            { name: 'mary jane', image: 'mary_jane.jpg', age: 25, weight: 55, history: 'es mary jane' },
            { name: 'peter parker', image: 'peter_parker.jpg', age: 30, weight: 70, history: 'es Piter' },
            { name: 'agnes', image: 'agnes.jpg', age: 30, weight: 50, history: 'es agnes' },
            { name: 'wanda maximoff', image: 'wanda_maximoff.jpg', age: 42, weight: 60, history: 'es wanda' },
            { name: 'vision', image: 'vision.jpg', age: 37, weight: 70, history: 'es vision ' },
            { name: 'gamora', image: 'gamora.jpg', age: 27, weight: 56, history: 'es gamora' },
            { name: 'groot', image: 'groot.jpg', age: 20, weight: 20, history: 'es groot ' },
            { name: 'nebula', image: 'nebula.jpg', age: 37, weight: 50, history: 'es nebula' },
            { name: 'star-lod', image: 'star_lod.jpg', age: 40, weight: 76, history: 'es star-lod' },
            { name: 'loki', image: 'loki.jpg', age: 27, weight: 72, history: 'es loki ' },
            { name: 'miss minutes', image: 'miss_minutes.jpg', age: 37, weight: 50, history: 'es miss minutes' },
            { name: 'he who ramains', image: 'he_who_ramains.jpg', age: 45, weight: 77, history: 'es he who remains' },
        ],
        {
            ignoreDuplicates: true
        }
    );

};

module.exports = dbConfig;


