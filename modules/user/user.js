const database = require("../database/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

/* async function checkuser (username, password) 
{
    const user = await database.query('SELECT * FROM public.user WHERE name=$1;', [username]);
    console.log("DB ", res.rows);
    user.pass
    return res.rows[0].id;
}

async function login (req, res) 
{
    console.log(req.body);
    const resp = await database.checkuser(req.body["user"], req.body["pass"]);
    //const cresp = crypto.
    res.cookie('token', `${resp}`, 
    { 
        maxAge: 900000, 
        //path: "http://localhost/",
        sameSite: "None",
        secure: true 
    }); //, httpOnly: true
    res.json({'token':resp});
}

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
        }
        else 
        {
            console.log(hash.length);
            const resp = await database.query(`INSERT INTO public.user (username, password, email, name, privilege, created_at, created_by) VALUES ($1, $2, $3, $4, $5, to_timestamp(${Date.now()} / 1000.0), ${thisuser});`, [username, hash, email, name, privilege])
            .then(resp => res.send("Usuario cadastrado com sucesso"))
            .catch(error => {
                console.log(error);
                res.send(error.detail)
            });
            
        }
    });
}

async function verify (req, res, next)
{
    console.log(req.cookies);
    const token = req.cookies["token"];
    if(!token) res.end();

    req.userid = token;
    next();
    //res.json(req.cookies);
    
}
 */
module.exports = { login, verify };