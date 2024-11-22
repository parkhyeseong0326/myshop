import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host:'127.0.0.1',
    port:3303,
    user:'root',
    password:'root1234',
    database:'user_account',
    connectionLimit:5,
})

export default async function handler(req, res) {
    if (req.method === 'POST'){
        try{
            const conn = await pool.getConnection();
            await conn.query('SELECT * FROM users');
            conn.release();
            res.status(200).json({message: "connection success"});
            // const {username, user_id, password} = req.body;
            // console.log(username);
        } catch (error) {
            console.log("DB error");
        }
    }
}