const mysql = require('mysql2');

module.exports = (router, database) => {
    router.post('/plans/create', async (req, res) => {
        const con = mysql.createConnection(database);
        const { name, price, discount, inscription, active, highlighted, extraInfo, features } = req.body;
        console.log(req.body);
        try {
            await con.promise().beginTransaction();

            if (highlighted === 1) {
                await con.promise().query(
                    `UPDATE plans SET highlighted = 0 WHERE highlighted = 1`
                );
            }

            const [result] = await con.promise().query(
                `INSERT INTO plans (name, price, discount, inscription, active, highlighted, extraInfo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name, price, discount, inscription, active, highlighted, extraInfo]
            );

            const planId = result.insertId;

            if (Array.isArray(features) && features.length > 0) {
                const values = features.map(f => [planId, f]);
                await con.promise().query(
                    `INSERT INTO plans_features (plan, feature) VALUES ?`,
                    [values]
                );
            }

            const [plansRows] = await con.promise().query(
                `SELECT * FROM plans WHERE id = ?`,
                [planId]
            );

            const [featuresRows] = await con.promise().query(
                `SELECT feature FROM plans_features WHERE plan = ?`,
                [planId]
            );

            const newPlan = {
                ...plansRows[0],
                features: featuresRows.map(f => f.feature)
            };

            await con.promise().commit();

            res.status(200).json(newPlan);
        } catch (error) {
            await con.promise().rollback();
            res.status(500).json({ success: false, error: error.message });
        } finally {
            con.end();
        }
    });
};
