//
// Puerto
//

process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//
// Vencimiento del tokn
//

// 60 segundos
// 30 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = '48h';


//
// Seed de autentificación
//

process.env.SEED = process.env.SEED || 'esta-es-la-clave-secreta';


//
//Base de datos
//

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


//
//Google Client ID
//

process.env.CLIENT_ID = process.env.CLIENT_ID || '84170599667-3ccrhld0n3igmdurqlptaiv4saodja16.apps.googleusercontent.com'