const mongoose = require('mongoose');

const Room = require('../models/room');
const Card = require('../models/card');

function randomCard(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

class cardsController {
  async getCards(req, res) {
    try {
      await Room.findById(req.body.params.id, async (err, room) => {
        const cards = await Card.find({});

        room.users.forEach((user, userIndex) => {
          console.log(user);
          cards[0].cards.forEach((type, cardsIndex) => {
            console.log('type', type);
            room.users[userIndex].cards.push(type);
          });
        });

        res.json(room);
      });
    } catch (e) {}
  }
}

module.exports = new cardsController();
