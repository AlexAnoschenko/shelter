const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomsRouters = require('./routers/roomsRouter');

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

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
