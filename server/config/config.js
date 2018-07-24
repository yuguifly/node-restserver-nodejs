//===========================
// PUERTO
//===========================


process.env.PORT = process.env.PORT || 3000;


//===========================
// ENTORNO
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLBD = urlDB;

//===========================
// Vencimiento del Token
//===========================
// 60 segundos
// 60 minutos
// 24 Horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//===========================
// SEED de Autentificación
//===========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';