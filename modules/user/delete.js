const database = require('./database');

//Deletar usuarios.
async function del (req, res) 
{
    const thisuser = req.thisuser;
    const response = await database.query(`DELETE FROM public.user CASCADE WHERE username=$1;`, [req.params['username']])
    .then(async resp => {
        const r = await database.query(`UPDATE public.deleted_user AS usr SET (deleted_at, deleted_by) = (to_timestamp(${Date.now()} / 1000.0), ${thisuser}) WHERE username=$1;`, [req.params['username']])
        res.send("Deletou aqui");
    })
    .catch(error => {
        console.log(error);//.detail
        res.send(`Deu erro aqui ${error}`);
    });
    console.log("DB ", response);
    //res.end();
}

module.exports = del;