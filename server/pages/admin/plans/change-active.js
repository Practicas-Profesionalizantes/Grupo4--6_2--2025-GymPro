const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.post('/plans/change-active', async (req, res) => {
        try {
            const con = mysql.createConnection(database);
            const [results_plans] = await con.promise().query(`UPDATE plans SET active = ? WHERE id = ?`, [req.body.active, req.body.user]);
            
            if (results_plans.affectedRows === 0) return res.status(500).json({
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