const mongoose = require('mongoose');


const express = require('express');
const app = express();
require('./startup/routes')(app);

mongoose.connect('mongodb://localhost/ecommerce')
  .then(() => console.log('Connected to MongoDB...'),{ useNewUrlParser: true },{ useUnifiedTopology: true })
  .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));