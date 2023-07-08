

 // GENRE
 const genre1 = await Genre.create({ name: 'aventure', status: true} );
 const genre2 = await Genre.create({ name: 'childish', status: true });
 const genre3 = await Genre.create({ name: 'animation', status: true });
 const genre4 = await Genre.create({ name: 'tale', status: true });
 const genre5 = await Genre.create({ name: 'childrens literature', status: true });
 const genre6 = await Genre.create({ name: 'science fiction', status: true });
 const genre7 = await Genre.create({ name: 'action', status: true });
 const genre8 = await Genre.create({ name: 'crime', status: true });
 const genre9 = await Genre.create({ name: 'fancy', status: true });
 const genre10 = await Genre.create({ name: 'super hero', status: true });
 
 // MOVIE
 const movie1 = await Movie.create({ tittle: 'aladdin', creation_date: '1992', qualification: 5 });
 const movie2 = await Movie.create({ tittle: 'la sirenita', creation_date: '1989', qualification: 4});
 const movie3 = await Movie.create({ tittle: 'universo de mickey mouse', creation_date: '1928', qualification: 5});
 const movie4 = await Movie.create({ tittle: 'spiderman', creation_date: '1994', qualification: 5 });
 const movie5 = await Movie.create({ tittle: 'wanda vision', creation_date: '2021', qualification: 3 });
 const movie6 = await Movie.create({ tittle: 'guardianes de la galaxia', creation_date: '2014', qualification: 4 });
 const movie7 = await Movie.create({ tittle: 'loki', creation_date: '2021', qualification: 4 });

 // CHARACTERS
 const char1 = await Character.create({ name: 'jasmine', age: 30, weight: 55, history: 'Es la protagonista' });
 const char2 = await Character.create({ name: 'el genio', age: 50, weight: 70, history: 'Es el genio' });
 const char3 = await Character.create({ name: 'aladdin', age: 30, weight: 70, history: 'Es el protagonista' });
 const char4 = await Character.create({ name: 'sultan', age: 30, weight: 70, history: 'Es el sultan' });
 const char5 = await Character.create({ name: 'ariel', age: 30, weight: 50, history: 'Es la protagonista' });
 const char6 = await Character.create({ name: 'principe eric', age: 30, weight: 70, history: 'Es el protagonista' });
 const char7 = await Character.create({ name: 'el rey del mar', age: 60, weight: 75, history: 'Es el rey del mar' });
 const char8 = await Character.create({ name: 'ursula', age: 50, weight: 60, history: 'Ella es ursula' });
 const char9 = await Character.create({ name: 'sebastian', age: 20, weight: 10, history: 'Es el cangrejo' });
 const char10 = await Character.create({ name: 'mickey mouse', age: 10, weight: 50, history: 'Es Micky Mouse' });
 const char11 = await Character.create({ name: 'minnie mouse', age: 10, weight: 45, history: 'Es Minnie Mouse' });
 const char12 = await Character.create({ name: 'pato donald', age: 10, weight: 40, history: 'Es el Pato Donald' });
 const char13 = await Character.create({ name: 'goofy', age: 10, weight: 30, history: 'Es Goofy' });
 const char14 = await Character.create({ name: 'pluto', age: 10, weight: 40, history: 'Es Pluto' });
 const char15 = await Character.create({ name: 'mary jane', age: 25, weight: 55, history: 'Es mary jane' });
 const char16 = await Character.create({ name: 'peter parker', age: 30, weight: 70, history: 'Es Piter' });
 const char17 = await Character.create({ name: 'agnes', age: 30, weight: 50, history: 'Es agnes' });
 const char18 = await Character.create({ name: 'wanda maximoff', age: 42, weight: 60, history: 'Es wanda' });
 const char19 = await Character.create({ name: 'vision', age: 37, weight: 70, history: 'Es vision ' });
 const char20 = await Character.create({ name: 'groot', age: 20, weight: 20, history: 'Es groot ' });
 const char21 = await Character.create({ name: 'nebula', age: 37, weight: 50, history: 'Es nebula' });
 const char22 = await Character.create({ name: 'star-lod', age: 40, weight: 76, history: 'Es star-lod' });
 const char23 = await Character.create({ name: 'loki', age: 27, weight: 72, history: 'Es loki ' });
 const char24 = await Character.create({ name: 'miss minutes', age: 37, weight: 50, history: 'Es miss minutes' });
 const char25 = await Character.create({ name: 'he who ramains', age: 45, weight: 77, history: 'Es he who remains' });

 
 await char1.addMovie(movie1);
 await char1.save();
 await char2.addMovie(movie1);
 await char2.save();
 await char3.addMovie(movie1);
 await char3.save();
 await char4.addMovie(movie1);
 await char4.save();
 await char5.addMovie(movie2);
 await char5.save();
 await char6.addMovie(movie2);
 await char6.save();
 await char7.addMovie(movie2);
 await char7.save();
 await char8.addMovie(movie2);
 await char8.save();
 await char9.addMovie(movie2);
 await char9.save();
 await char10.addMovie(movie3);
 await char10.save();
 await char11.addMovie(movie3);
 await char11.save();
 await char12.addMovie(movie3);
 await char12.save();
 await char13.addMovie(movie3);
 await char13.save();
 await char14.addMovie(movie3);
 await char14.addMovie(movie3);
 await char14.save();
 await char15.addMovie(movie4);
 await char15.save();
 await char16.addMovie(movie4);
 await char16.save();
 await char17.addMovie(movie5);
 await char17.save();
 await char18.addMovie(movie5);
 await char18.save();
 await char19.addMovie(movie5);
 await char19.save();
 await char20.addMovie(movie6);
 await char20.save();
 await char21.addMovie(movie6);
 await char21.save();
 await char22.addMovie(movie6);
 await char22.save();
 await char23.addMovie(movie7);
 await char23.save();
 await char24.addMovie(movie7);
 await char24.save();
 await char25.addMovie(movie7);
 await char25.save();
 
 
 await movie1.setGenre([genre1, genre2, genre3]);
 await movie1.save();
 await movie2.setGenre([genre3, genre4, genre5]);
 await movie2.save();
 await movie3.setGenre([genre2, genre3, genre8]);
 await movie3.save();
 await movie4.setGenre([genre1, genre6, genre7, genre10]);
 await movie4.save();
 await movie5.setGenre([genre6, genre9, genre10]);
 await movie5.save();
 await movie6.setGenre([genre6, genre7]);
 await movie6.save();
 await movie7.setGenre([genre1, genre6, genre7, genre9, genre10]);
 await movie7.save();

 await GenreMovies.bulkCreate(
    [
        { genreId: 1, movieId: 1},
        { genreId: 2, movieId: 1},
        { genreId: 3, movieId: 1},
        { genreId: 3, movieId: 2},
        { genreId: 4, movieId: 2},
        { genreId: 5, movieId: 2},
        { genreId: 2, movieId: 3},
        { genreId: 3, movieId: 3},
        { genreId: 8, movieId: 3},
        { genreId: 1, movieId: 4},
        { genreId: 6, movieId: 4},
        { genreId: 7, movieId: 4},
        { genreId: 10, movieId: 4},
        { genreId: 6, movieId: 5},
        { genreId: 9, movieId: 5},
        { genreId: 10, movieId: 5},
        { genreId: 6, movieId: 6},
        { genreId: 7, movieId: 6},
        { genreId: 1, movieId: 7},
        { genreId: 6, movieId: 7},
        { genreId: 7, movieId: 7},
        { genreId: 9, movieId: 7},
        { genreId: 10, movieId: 7},

    ]
);

GenreMovies.belongsTo(Genre);
GenreMovies.belongsTo(Movie);
const GenreMovies = require('../models/genreMovie');