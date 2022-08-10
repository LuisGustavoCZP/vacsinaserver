const database = require('./database');
const bcrypt = require('bcrypt');
const session = require('./session');

//Logar com nome e senha usuarios.
async function login (req, res) 
{
    const {username, password} = req.body;
    if(!password) 
    {
        res.send("Não inseriu senha!");
    } 
    else
    {
        const response = await database.query('SELECT * FROM public.user WHERE username=$1', [username])
        .then(resp => 
        {
            //Encontrou usuario?
            if(resp.rows && resp.rows.length > 0) 
            {
                const user = resp.rows[0];
                bcrypt.compare(password, user.password, (err, same) => 
                {
                    if(same) 
                    {
                        session.create(res, user.id);
                        res.send(`Login feito para ${user.name}`);
                    }
                    else 
                    {
                        session.clear(res);
                        res.send(`A senha não bate com o login!`);
                        
                    }
                });
            }
            //Não encontrou usuario
            else 
            {
                session.clear(res);
                res.send(`Não existe usuario com este login!`);
            }
        })
        .catch(error => {
            console.log(error);//.detail
            res.send(error);
        });
        
    }
}

module.exports = login;