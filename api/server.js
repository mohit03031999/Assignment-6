require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');

const app = express();

installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

// eslint-disable-next-line func-names
(async function () {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log(`API server started at port ${port}`);
    });
  } catch (error) {
    console.log('Error connecting to DB - ', error);
  }
}());
