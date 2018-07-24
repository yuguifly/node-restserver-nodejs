/**
 * PUERTO
 */


process.env.PORT = process.env.PORT || 3000;


/**
 * ENTORNO
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafeuser:pas123456@ds147181.mlab.com:47181/cafehugo';
}

process.env.URLBD = urlDB;