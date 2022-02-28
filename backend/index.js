const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomsRouters = require('./routers/roomsRouter');

dotenv.config();

const PORT = process.env.PORT || 5001;

// app.ws('/', (ws, req) => {
//   console.log('BACK WEBSOCKET CONNECTED');
//   ws.send('FROM BACK');
//   ws.on('message', (msg) => {
//     console.log(JSON.parse(msg));
//   });
// });

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
