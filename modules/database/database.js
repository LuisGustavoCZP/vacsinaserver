const { Pool, Client } = require('pg');
const dbData = {
    host: 'localhost',
    user: 'postgres',
    password: 'czp1248',
    database: 'vacsina_db',
    max: process.env.BD_MAX||20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

// ==> Conexão com a Base de Dados:
const pool = new Pool(dbData);

pool.on('connect', () => 
{
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};