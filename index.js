// server.js
const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

const authUser = require('./routes/authUser');
const bodyParser = require('body-parser');
const { notfound, errorHandler } = require('./middlewares/errorHandler');
const { data } = require('./routes/data');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', (req, res) => {
  const jsonData = JSON.stringify(data);
  res.setHeader('Content-Type', 'application/json');
  res.end(jsonData);
});
app.use('/api/user', authUser);
app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
