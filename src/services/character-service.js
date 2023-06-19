const Character = require('../models/character');

const create = async ( body ) => {
    const character = Character.create({
  
    });

    await character.save();
    return character;
};

module.exports = {
    create
};
