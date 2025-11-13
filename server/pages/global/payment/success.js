const mysql = require('mysql2');
const { Payment } = require('mercadopago');

module.exports = (router, database, mpClient) => {
    router.get('/payment/success', async (req, res) => {
        const { payment_id } = req.query;

        if (payment_id === undefined) return res.status(400).send("PAYMENT_ID_MISSING");

        try {
            const payment = new Payment(mpClient);
            const curPayment = await payment.get({ id: payment_id });

            if (curPayment.status !== "approved") throw new Error("PAYMENT_NOT_APPROVED");

            const metadata = curPayment.metadata;

            let userId;

            const con = mysql.createConnection(database);
            const [results] = await con.promise().query(`SELECT id FROM users WHERE email = '${curPayment.metadata.user.email}'`);

            if (results.length === 0) {
                const [inserted_user] = await con.promise().query(
                    `INSERT INTO users (email, password, name, lastname, phone, dniType, dni) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [metadata.user.email, metadata.user.password, metadata.user.name, metadata.user.surname, metadata.user.area_code + metadata.user.phone, metadata.user.documentType, metadata.user.documentNumber]
                )

                userId = inserted_user.insertId;
            }
            else
            {
                userId = results[0].id;
            }

            await con.promise().query(
                `INSERT INTO subscriptions (user, payment_id, amount, plan, expire, active) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH), ?)`,
                [userId, curPayment.id, curPayment.transaction_amount, metadata.plan, 1]
            );

            const redirectUrl = `http://localhost:3000/payment/success?payment_id=${curPayment.id}&amount=${curPayment.transaction_amount}&email=${curPayment.metadata.user.email}`;
            res.redirect(redirectUrl);
        } catch (err) {
            if (err.code !== "ER_DUP_ENTRY") {
                console.error(err);
            }

            const redirectUrl = `http://localhost:3000/payment/failed`;
            res.redirect(redirectUrl);
        }
    });
}