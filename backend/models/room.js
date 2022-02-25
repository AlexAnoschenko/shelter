const { Schema, model } = require('mongoose');

const Room = new Schema({
  users: { type: Array, ref: 'Users' },
  numberOfPlayers: { type: Number },
});

module.exports = new model('Room', Room);
