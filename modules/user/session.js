//Cria e checa a sessão do usuario
const crypto = require('crypto');

const sessions = {};

async function clear (res)
{
    res.cookie('token', ``, 
    { 
        maxAge: 1, 
        //path: "http://localhost/",
        sameSite: "None",
        secure: false 
    });
}

async function verify (req, res, next) 
{
    const token = req.cookies["token"];
    const session = sessions[token];
    if(session)
    {
        req.thisuser = session.userid;
        //console.log(users[userid].name);
        next();
    } else {
        clear(res);
        //res.status(404).end();
        res.send(`Usuario não está logado!`);
    }
}

async function create (res, userid)
{
    const sessao = {"token":crypto.randomUUID(), "userid":userid};
    sessions[sessao.token] = sessao;
    res.cookie('token', `${sessao.token}`, 
    { 
        maxAge: 1000*60*2, 
        //path: "http://localhost/",
        sameSite: "None",
        secure: false 
    });
}

module.exports = {verify, create, clear};
