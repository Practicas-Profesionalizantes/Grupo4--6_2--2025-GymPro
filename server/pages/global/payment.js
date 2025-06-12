const auth = require('../../functions/auth');
const functions = require('../../functions/functions');

const { Preference } = require('mercadopago');

module.exports = (router, database, mpClient) => 
{
    router.get('/payment', async (req, res) => {
        
        const preference = new Preference(mpClient);

        preference.create({
            body: {
                items: [
                    {
                        title: 'Mi producto',
                        quantity: 1,
                        unit_price: 2000
                    }
                ],
            }
        })
        .then(console.log)
        .catch(console.log);

        res.send('pong')
    });
}