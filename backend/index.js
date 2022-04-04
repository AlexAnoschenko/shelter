const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomsRouters = require('./routers/roomsRouter');
const cardsRouters = require('./routers/cardsRouter');
const Room = require('./models/room');
const Card = require('./models/card');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

dotenv.config();

const PORT = process.env.PORT || 5001;

app.ws('/', (ws, req) => {
  console.log('--- BACK WEBSOCKET CONNECTED ---');

  ws.on('message', (msg) => {
    msg = JSON.parse(msg);

    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg);
        break;

      case 'updateRoom':
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

          ws.id = msg.id;
          aWss.clients.forEach((client) => {
            if (client.id === msg.id) {
              client.send(JSON.stringify(room));
            }
          });
        });
        break;

      case 'openCard':
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

          ws.id = msg.id;
          aWss.clients.forEach((client) => {
            if (client.id === msg.id) {
              client.send(JSON.stringify(room));
            }
          });
        });
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(`user ${msg.nickname} connected`));
    }
  });
};

app.use(cors());
app.use(express.json());
app.use('/rooms', roomsRouters);
app.use('/cards', cardsRouters);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Elegantny:4593307899Alex@cluster0.i9e2d.mongodb.net/dbShelter?retryWrites=true&w=majority'
    );

    console.log('--- Connected DB ---');

    app.listen(PORT, () =>
      console.log(`--- Server has been started on port --- ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
