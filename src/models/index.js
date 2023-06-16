const Character = require('./character');
const Genre = require('./genre');
const Movie = require('./movie');
const User = require('./user');

Character.belongsToMany(Movie, { through: 'CharacterMovie' });
Movie.belongsToMany(Character, { through: 'CharacterMovie' });

Genre.hasMany(Movie, { onDelete: 'CASCADE' });
Movie.belongsTo(Genre, { onDelete: 'CASCADE' });

module.exports = {
    Character,
    Genre,
    Movie,
    User
};
