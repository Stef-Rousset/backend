const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const app = express();
const path = require('path');

require('dotenv').config();
const mongoPassword = process.env.MONGOPASSWORD
//connexion à mongoDB
mongoose.connect(`mongodb+srv://stephanie:${mongoPassword}@clusteroc.mmc8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//middleware global pour transfo le corps json des requetes en objets JS
app.use(bodyParser.json());
// images
app.use('/images', express.static(path.join(__dirname, 'images')));
// import des routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
