const { Pool, Client } = require('pg');
const req = require('express/lib/request');
const { user } = require('pg/lib/defaults');
const dbData = {
    host: 'localhost',
    user: 'postgres',
    password: 'czp1248',
    database: 'vacsina_db',
};

async function checkuser (values) 
{
    const client = new Client(dbData);
    await client.connect();
    const res = await client.query('SELECT * FROM public.user WHERE name=$1 AND pass=$2;', values);
    console.log("DB ", res.rows);
    client.end();
    return res.rows[0].id;
}

module.exports = { checkuser };