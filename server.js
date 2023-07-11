const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const database_url = process.env.DATABASE_URL;
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.log('Error connecting to Database:', error);
  });

app.use(express.json());

const noteRoutes = require('./routes/noteRoutes');
app.use('/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
