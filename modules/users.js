const database = require("./database");

async function login (req, res) 
{
    console.log(req.body);
    const resp = await database.checkuser([req.body["user"], req.body["pass"]]);
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

async function verify (req, res, next)
{
    console.log(req.cookies);
    const token = req.cookies["token"];
    if(!token) res.end();

    req.userid = token;
    next();
    //res.json(req.cookies);
    
}

module.exports = { login, verify };