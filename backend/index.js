const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomsRouters = require('./routers/roomsRouter');
const Room = require('./models/room');

dotenv.config();

const PORT = process.env.PORT || 5001;

app.ws('/', (ws, req) => {
  console.log('BACK WEBSOCKET CONNECTED');

  ws.on('message', (msg) => {
    msg = JSON.parse(msg);

    switch (msg.method) {
      case 'updateRoom':
        Room.findOne(msg.id)
          .clone()
          .then((room) => {
            ws.id = room.id;
            aWss.clients.forEach((client) => {
              if (client.id === msg.id) {
                client.send(JSON.stringify(room));
              }
            });
          });
        break;

      default:
        break;
    }
  });
});

// const connectionHandler = (ws, msg) => {
//   ws.id = msg.id;
//   broadcastConnection(ws, msg);
// };

// const broadcastConnection = (ws, msg) => {
//   aWss.clients.forEach((client) => {
//     if (client.id === msg.id) {
//       client.send(msg);
//     }
//   });
// };

app.use(cors());
app.use(express.json());
app.use('/rooms', roomsRouters);

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
