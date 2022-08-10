const database = require('./database');
const bcrypt = require('bcrypt');

//Registrar usuarios.
async function register (req, res) 
{
    const thisuser = req.thisuser;
    const { username, password, email, name, privilege=1 } = req.body;
    if(username == '') username = "undefined";
    console.log(username, password, email, name, privilege);
    bcrypt.hash(password, 12, async (err, hash) =>
    {
        if(err) 
        {
            res.send("Senha inválida");
            //console.log(err);
            //res.send(err);
        }
        else 
        {
            console.log(hash.length);
            const resp = await database.query(`INSERT INTO public.user (username, password, email, name, privilege, created_at, created_by) VALUES ($1, $2, $3, $4, $5, to_timestamp(${Date.now()} / 1000.0), ${thisuser});`, [username, hash, email, name, privilege])
            .then(resp => res.send("Usuario cadastrado com sucesso"))
            .catch(error => {
                console.log(error);//.detail
                res.send(error.detail)
            }); //req.query["username"], hash
            
        }

        //console.log("Registrou", resp);
    });
}

module.exports = register;