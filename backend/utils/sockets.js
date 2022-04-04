const Room = require('../models/room');
const Card = require('../models/card');
const { shuffle } = require('./services');

function connectionHandler(ws, msg, aWss) {
  broadcastConnection(
    ws,
    msg,
    aWss,
    `user ${msg.nickname} connected`
  );
}

function addUserHandler(ws, msg, aWss) {
  Room.findById(msg.id).then(async (room) => {
    room.users.push(msg.user);
    room.save();
    if (room.users.length === room.numberOfPlayers) {
      const cards = await Card.find({});
      room.users.forEach((user, userIndex) => {
        cards[0].cards.forEach((type, cardsIndex) => {
          for (let key in type) {
            shuffle(type[key]);
            room.users[userIndex].cards.push(type[key].shift());
          }
        });
      });
      await Room.findOneAndUpdate(
        { _id: msg.id },
        {
          $set: {
            users: room.users,
          },
        }
      ).clone();
    }
    broadcastConnection(ws, msg, aWss, room);
  });
}

function openCardHandler(ws, msg, aWss) {
  Room.findById(msg.id).then(async (room) => {
    room.users.forEach((user) => {
      if (msg.user.userId === user.userId) {
        user.cards.forEach(async (card) => {
          if (String(card.id) === msg.user.card.id) {
            card.isVisible = true;
            await Room.findOneAndUpdate(
              { _id: msg.id },
              {
                $set: {
                  users: room.users,
                },
              }
            ).clone();
          }
        });
      }
    });
    broadcastConnection(ws, msg, aWss, room);
  });
}

const broadcastConnection = (ws, msg, aWss, response) => {
  ws.id = msg.id;
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(response));
    }
  });
};

module.exports = {
  connectionHandler,
  addUserHandler,
  openCardHandler,
};
