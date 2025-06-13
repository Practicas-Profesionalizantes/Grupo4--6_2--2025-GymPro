const moment = require('moment-timezone');
const mysql = require('mysql2');
const { Preference } = require('mercadopago');

module.exports = (router, database, mpClient) => 
{
    router.post('/payment/create', async (req, res) => {
        const con = mysql.createConnection(database);
        const preference = new Preference(mpClient);
        const body = req.body;
        console.log(body)
        try {
            const [results_plans] = await con.promise().query(`SELECT * FROM plans WHERE id = '${body.plan}'`);
            console.log(results_plans)
            const selected_plan = results_plans[0];

            const newPayment = await preference.create({
                body: {
                    expires: true,
                    expiration_date_from: moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                    expiration_date_to: moment().tz('America/Argentina/Buenos_Aires').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                    auto_return: "all",
                    back_urls: {
                        success:  req.headers.host + "/payment/success",
                        pending:  req.headers.host + "/payment/pending",
                        failure:  req.headers.host + "/payment/failed"
                    },
                    payment_methods: {
                        excluded_payment_methods: [],
                        excluded_payment_types: [
                            {
                                id: "ticket"
                            }
                        ],
                        installments: 1
                    },
                    items: [
                        {
                            title: selected_plan.name,
                            quantity: 1,
                            unit_price: selected_plan.price
                        }
                    ],
                    payer: {
                        name: body.name,
                        surname: body.lastname,
                        email: body.email,
                        phone: {
                            area_code: "54",
                            number: body.phone
                        }
                    },
                    metadata: {
                        // user_id: userData.id,
                        // first_name: body.name,
                        // last_name: body.lastname,
                        // email: results_user[0].mail,
                        // phone: body.phone,
                        // date: body.date,
                        // time: body.time,
                        // players: body.players,
                        // plan_id: plan.id,
                        // room_id: room.id
                    }
                }
            })
            console.log(newPayment)

            // res.status(200).json({
            //     success: true,
            //     link: newPayment.init_point
            // });
            res.redirect(newPayment.init_point)
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            con.end();
        }
    });
}