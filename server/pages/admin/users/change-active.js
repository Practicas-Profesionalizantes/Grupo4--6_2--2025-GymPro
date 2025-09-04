const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.post('/users/change-active', async (req, res) => {
        try {
            const con = mysql.createConnection(database);
            const [results_subscriptions] = await con.promise().query(`UPDATE subscriptions SET active = ? WHERE user = ?`, [req.body.active, req.body.user]);
            
            if (results_subscriptions.affectedRows === 0) return res.status(500).json({
                success: false
            });

            res.status(200).json({
                success: true
            });
        } catch (error) {
            res.status(500).json({
                success: false
            });
        }
    });
}