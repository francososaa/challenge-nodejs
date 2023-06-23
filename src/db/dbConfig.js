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

    const char1 = await Character.create({ name: 'Jasmine', age: 30, weight: 55, history: 'Es la protagonista'});
    const char2 = await Character.create({ name: 'El genio', age: 50, weight: 70, history: 'Es el genio'});
    const char3 = await Character.create({ name: 'Aladdin', age: 30, weight: 70, history: 'Es el protagonista'});
    const char4 = await Character.create({ name: 'Sultan', age: 30, weight: 70, history: 'Es el sultan'});
    const char5 = await Character.create({ name: 'Ariel', age: 30, weight: 50, history: 'Es la protagonista'});
    const char6 = await Character.create({ name: 'Principe Eric', age: 30, weight: 70, history: 'Es el protagonista'});
    const char7 = await Character.create({ name: 'El rey del mar', age: 60, weight: 75, history: 'Es el rey del mar'});
    const char8 = await Character.create({ name: 'Ursula', age: 50, weight: 60, history: 'Ella es ursula'});
    const char9 = await Character.create({ name: 'Sebastian', age: 20, weight: 10, history: 'Es el cangrejo'});
    const char10 = await Character.create({ name: 'Mickey Mouse', age: 10, weight: 50, history: 'Es Micky Mouse'});
    const char11 = await Character.create({ name: 'Minnie Mouse', age:10, weight: 45, history: 'Es Minnie Mouse'});
    const char12 = await Character.create({ name: 'Pato Donald', age: 10, weight: 40, history: 'Es el Pato Donald'});
    const char13 = await Character.create({ name: 'Goofy', age: 10, weight: 30, history: 'Es Goofy'});
    const char14 = await Character.create({ name: 'Pluto', age: 10, weight: 40, history: 'Es Pluto'});
    
    const movie1 = await Movie.create({ tittle: 'Aladdin', creation_date: '1992', qualification: 5 });
    const movie2 = await Movie.create({ tittle: 'La Sirenita', creation_date: '1989', qualification: 4});
    const movie3 = await Movie.create({ tittle: 'Universo de Mickey Mouse', creation_date: '1928', qualification: 5});

    const genre1 = await Genre.create({ name: 'aventure', status: true} );
    const genre2 = await Genre.create({ name: 'childish', status: true });
    const genre3 = await Genre.create({ name: 'animation', status: true });
    const genre4 = await Genre.create({ name: 'tale', status: true });
    const genre5 = await Genre.create({ name: 'childrens literature', status: true });

    await char1.addMovie(movie1);
    await char2.addMovie(movie1);
    await char3.addMovie(movie1);
    await char4.addMovie(movie1);
    await char5.addMovie(movie2);
    await char6.addMovie(movie2);
    await char7.addMovie(movie2);
    await char8.addMovie(movie2);
    await char9.addMovie(movie2);
    await char10.addMovie(movie3);
    await char11.addMovie(movie3);
    await char12.addMovie(movie3);
    await char13.addMovie(movie3);
    await char14.addMovie(movie3);
    await char1.save();
    await char2.save();
    await char3.save();
    await char4.save();
    await char5.save();
    await char6.save();
    await char7.save();
    await char8.save();
    await char9.save();
    await char10.save();
    await char11.save();
    await char12.save();
    await char13.save();
    await char14.save();

    await movie1.setGenre([genre1, genre2, genre3]);
    await movie2.setGenre([genre3, genre4, genre5]);
    await movie3.setGenre([genre2, genre3]);
    await movie1.save();
    await movie2.save();
    await movie3.save();


};

module.exports = dbConfig;


/*
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
        { tittle: 'Aladdin', creation_date: '1992', qualification: 5 },
        { tittle: 'La Sirenita', creation_date: '1989', qualification: 4},
        { tittle: 'Universo de Mickey Mouse', creation_date: '1928', qualification: 5},
    ]); */