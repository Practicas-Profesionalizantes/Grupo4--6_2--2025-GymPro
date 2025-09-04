const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.post('/users/register-access', async (req, res) => {
        try {
            const con = mysql.createConnection(database);
            const [results_log_access] = await con.promise().query(`INSERT INTO log_access (user) VALUES (?) RETURNING date`, [req.body.user]);

            res.status(200).json({
                last_access: results_log_access[0].date
            });
        } catch (error) {
            res.status(500).json({
                success: false
            });
        }
    });
}