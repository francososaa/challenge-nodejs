const Character = require('../models/character');
const Genre = require('../models/genre');
const Movie = require('../models/movie');
const User = require('../models/user');


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
};

async function mockData(db) {

    await db.sync({ force: true });
    await User.create(
        { name: 'Micaela', email: 'micaela.velazco@yahoo.com', password: 'sosita03323'},
    );

    await Genre.bulkCreate([
        { name: 'aventure', status: true },
        { name: 'childish', status: true },
        { name: 'animation', status: true },
        { name: 'tale', status: true },
        { name: 'childrens literature', status: true }
    ]);

    await Character.bulkCreate([
        { name: 'Jasmine', age: 30, weight: 55, history: 'Es la protagonista'},
        { name: 'El genio', age: 50, weight: 70, history: 'Es el genio'},
        { name: 'Aladdin', age: 30, weight: 70, history: 'Es el protagonista'},
        { name: 'Sultan', age: 30, weight: 70, history: 'Es el sultan'},
        { name: 'Ariel', age: 30, weight: 50, history: 'Es la protagonista'},
        { name: 'Principe Eric', age: 30, weight: 70, history: 'Es el protagonista'},
        { name: 'El rey del mar', age: 60, weight: 75, history: 'Es el rey del mar'},
        { name: 'Ursula', age: 50, weight: 60, history: 'Ella es ursula'},
        { name: 'Sebastian', age: 20, weight: 10, history: 'Es el cangrejo'},
        { name: 'Mickey Mouse', age: 10, weight: 50, history: 'Es Micky Mouse'},
        { name: 'Minnie Mouse', age:10, weight: 45, history: 'Es Minnie Mouse'},
        { name: 'Pato Donald', age: 10, weight: 40, history: 'Es el Pato Donald'},
        { name: 'Goofy', age: 10, weight: 30, history: 'Es Goofy'},
        { name: 'Pluto', age: 10, weight: 40, history: 'Es Pluto'},
    ]);

    await Movie.bulkCreate([
        { tittle: 'Aladdin', creation_date: '1992', qualification: 5},
        { tittle: 'La Sirenita', creation_date: '1989', qualification: 4},
        { tittle: 'Universo de Mickey Mouse', creation_date: '1928', qualification: 5},
    ])

   

};

module.exports = dbConfig;
