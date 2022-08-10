const database = require('./database');

//Checar usuarios usando nome ou id.
async function check (req, res) 
{
    const { username='', userid=-1, name='' } = req.query;
    const response = await database.query('SELECT * FROM public.user AS usr WHERE usr.id=$1 OR usr.username=$2 OR usr.name=$3', [userid, username, name])
    .then(resp => {
        console.log("Check ", resp.rows);
        res.send(resp.rows);
    })
    .catch(error => {
        console.log(error);//.detail
        res.send(error.detail);
    });
    //
}

module.exports = check;