const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.post('/plans/edit', async (req, res) => {
        const con = mysql.createConnection(database);
        const { id, name, price, discount, inscription, active, highlighted, extraInfo, features } = req.body;

        try {
            await con.promise().beginTransaction();

            if (highlighted === 1) {
                await con.promise().query(
                    `UPDATE plans SET highlighted = 0 WHERE highlighted = 1`
                );
            }

            await con.promise().query(
                `UPDATE plans 
                 SET name = ?, price = ?, discount = ?, inscription = ?, active = ?, highlighted = ?, extraInfo = ?
                 WHERE id = ?`,
                [name, price, discount, inscription, active, highlighted, extraInfo, id]
            );

            await con.promise().query(
                `DELETE FROM plans_features WHERE plan = ?`,
                [id]
            );

            if (Array.isArray(features) && features.length > 0) {
                const values = features.map(f => [id, f]);
                await con.promise().query(
                    `INSERT INTO plans_features (plan, feature) VALUES ?`,
                    [values]
                );
            }

            await con.promise().commit();

            res.status(200).json({
                success: true
            });
        } catch (error) {
            await con.promise().rollback();
            res.status(500).json({
                success: false,
                error: error.message
            });
        } finally {
            con.end();
        }
    });
}
