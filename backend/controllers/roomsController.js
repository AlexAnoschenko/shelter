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

  async getRoom(req, res) {
    try {
      await Room.findById('6218c5baafd9afb0816fd137', (err, doc) =>
        res.json(doc)
      );
    } catch (e) {}
  }
}

module.exports = new roomsController();
