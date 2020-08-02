require('./config/config');
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");


mongoose.connect(process.env.UrlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).
  catch(error => handleError(error));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// se indica el archivo de rutas a usarse 
app.use( require('./routes/usuario'))

// indica el puerto por donde se esta escuchando
app.listen(process.env.PORT, () => {
  console.log("Escuchando por el puerto 3000");
});
