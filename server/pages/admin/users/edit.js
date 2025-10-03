const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.put('/users/edit', async (req, res) => {
        const con = mysql.createConnection(database);
        const { id, name, email, phone, dniType, dni, plan, expire } = req.body;

        try {
            await con.promise().beginTransaction();

            await con.promise().query(
                `UPDATE users 
                 SET name = ?, email = ?, phone = ?, dniType = ?, dni = ? 
                 WHERE id = ?`,
                [name, email, phone, dniType, dni, id]
            ); 

            await con.promise().query(
                `UPDATE subscriptions 
                 SET plan = ?, expire = ? 
                 WHERE user = ?`,
                [plan, expire, id]
            );

            await con.promise().commit();

            res.status(200).json({
                success: true
            });
        } catch (error) {
            await con.promise().rollback();
            res.status(500).json({
                success: false
            });
        } finally {
            con.end();
        }
    });
}
