const database = require('./database');
const bcrypt = require('bcrypt');

//Modificar nome usuarios.
async function modify (req, res) 
{
    const thisuser = req.thisuser;
    //const password = req.body["password"];
    const { username, password, email, name, privilege=1 } = req.body;
    
    bcrypt.hash(password, 12, async (err, hash) =>
    {
        if(err) 
        {
            res.send("Senha inválida");
        }
        else 
        {
            const params = Object.keys(req.body);
            const keys = params.reduce((prev, curr, i) => 
            {
                return prev + (i != 0?", ":"") + curr; 
            }, "");
            const values = params.reduce((prev, curr, i) => 
            {
                const value = req.body[curr];
                return prev + (i != 0?", ":"") + value; 
            }, "");
            console.log(hash.length);
            //const response = await database.query(`UPDATE public.user AS usr SET ($2, updated_at, updated_by)=($3, to_timestamp(${Date.now()} / 1000.0), ${thisuser}) WHERE usr.id=$1;`, [parseInt(req.params['userid']), keys, values])
            const response = await database.query(`UPDATE public.user AS usr SET (username, password, email, name, privilege, updated_at, updated_by)=($2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0), ${thisuser}) WHERE usr.username=$1;`, [req.params['username'], username, hash, email, name, privilege])
            .then(resp => res.send("Usuario atualizado com sucesso"))
            .catch(error => {
                console.log(error);//.detail
                res.send(error.detail)
            });
        }
    }); 
    
}

module.exports = modify;