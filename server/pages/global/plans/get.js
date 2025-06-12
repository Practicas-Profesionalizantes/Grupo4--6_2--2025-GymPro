const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.get('/plans/get', async (req, res) => {
        const con = mysql.createConnection(database);
        
        try {
            const [results] = await con.promise().query('SELECT * FROM plans');

            res.status(200).json({
                success: true,
                data: results
            });
        } catch (error) {
            console.error(error);
        } finally {
            con.end();
        }
    });
}