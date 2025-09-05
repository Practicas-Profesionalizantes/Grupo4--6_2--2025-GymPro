const mysql = require('mysql2');

module.exports = (router, database) => 
{
    router.get('/users/get', async (req, res) => {
        const con = mysql.createConnection(database);
        const [results_users] = await con.promise().query(`
            SELECT
            u.*,
            p.id   AS plan_id,
            p.name AS plan_name,
            s.expire,
            s.active,
            lg.last_access
            FROM users u
            LEFT JOIN (
                SELECT user, MAX(expire) AS last_expire
                FROM subscriptions
                GROUP BY user
            ) sx ON sx.user = u.id
            LEFT JOIN subscriptions s ON s.user = sx.user AND s.expire = sx.last_expire
            LEFT JOIN plans p ON s.plan = p.id
            LEFT JOIN (
                SELECT user, MAX(date) AS last_access
                FROM log_access
                GROUP BY user
            ) lg ON u.id = lg.user;
        `);

        res.status(200).json({
            success: true,
            data: results_users
        });
    });
}