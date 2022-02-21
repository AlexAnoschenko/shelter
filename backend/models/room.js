const { Schema, model } = require('mongoose');

const Room = new Schema({
  users: { type: Array, ref: 'Users' },
});

module.exports = new model('Room', Room);
