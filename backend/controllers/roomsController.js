const mongoose = require('mongoose');

const Room = require('../models/room');

class roomsController {
  async createRoom(req, res) {
    try {
      const { nickname, numberOfPlayers } = req.body;

      const room = new Room({
        users: [nickname],
        numberOfPlayers: numberOfPlayers,
      });

      await room.save();

      res.json({
        roomId: room._id,
        nickname: nickname,
        numberOfPlayers: numberOfPlayers,
      });
    } catch (e) {
      res.status(400).json({ message: 'Creating room error' });
    }
  }

  //------------------ UPDATE ARRAY

  async createUser(req, res) {
    console.log('123');
    try {
      const { nickname } = req.body;

      const room = new Room({
        users: users.push(nickname),
      });

      await room.save();

      res.json({
        roomId: room._id,
        nickname: nickname,
      });
    } catch (e) {}
  }

  async getRoom(req, res) {
    try {
      await Room.findById(req.query.id, (err, doc) => {
        res.json(doc);
      });
    } catch (e) {}
  }
}

module.exports = new roomsController();
