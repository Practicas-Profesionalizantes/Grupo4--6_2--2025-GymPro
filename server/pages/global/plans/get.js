const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.get('/plans/get', async (req, res) => {
        const con = mysql.createConnection(database);
        
        try {
            const [results] = await con.promise().query(`
                SELECT 
                    p.*,
                GROUP_CONCAT(pf.feature SEPARATOR ', ') AS features
                FROM plans p
                LEFT JOIN plans_features pf ON p.id = pf.plan
                GROUP BY p.id, p.name, p.price, p.discount, p.inscription;
            `);

            let resultsFormatted = results.map(plan => ({
                ...plan,
                features: plan.features ? plan.features.split(',').map(f => f.trim()) : []
            }));

            res.status(200).json({
                success: true,
                data: resultsFormatted
            });
        } catch (error) {
            console.error(error);
        } finally {
            con.end();
        }
    });
}