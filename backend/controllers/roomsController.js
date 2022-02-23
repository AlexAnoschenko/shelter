const Room = require('../models/room');

class roomsController {
  async createRoom(req, res) {
    try {
      const room = new Room();
      await room.save();
      res.json({ roomId: room._id, nickname: req.body.nickname });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Creating room error' });
    }
  }

  async getRoomId(req, res) {
    try {
    } catch (e) {}
  }
}

module.exports = new roomsController();
