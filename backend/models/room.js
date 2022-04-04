const { Schema, model } = require('mongoose');

const Room = new Schema({
  users: { type: Array, ref: 'Users' },
  shelter: { type: Object },
  numberOfPlayers: { type: Number },
});

module.exports = new model('Room', Room);
