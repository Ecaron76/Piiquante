const mongoSanitize = require('express-mongo-sanitize');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ecaron:flodarkness@cluster0.w3o9wn3.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const express = require('express');
const path = require('path');

const userRoutes= require('./routes/user');
const saucesRoutes= require('./routes/sauces');

const app= express();


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(mongoSanitize());

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces',saucesRoutes);
app.use('/api/auth',userRoutes);


module.exports = app;






