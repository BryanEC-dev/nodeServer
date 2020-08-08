//===============
//puerto
//==============

process.env.PORT = process.env.PORT || 1000


//===============
// Entorno
//==============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===============
// BD
//==============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://<user>:<password>@<cadena de conexion><base>'
}

process.env.UrlDB = urlDB;

//
