const mysql = require('mysql2/promise');

module.exports = (router, database) => {
    router.delete('/plans/delete/:id', async (req, res) => {
        const con = await mysql.createConnection(database);
        const { id } = req.params;

        try {
            await con.beginTransaction();

            const [plans] = await con.query('SELECT * FROM plans WHERE id = ?', [id]);

            if (plans.length === 0) {
                await con.rollback();
                return res.status(404).json({ success: false, error: 'Plan no encontrado' });
            }
            const planToDelete = plans[0];

            await con.query('DELETE FROM plans_features WHERE plan = ?', [id]);
            await con.query('DELETE FROM plans WHERE id = ?', [id]);

            await con.commit();
            res.json({ success: true, message: 'Plan eliminado correctamente', plan: planToDelete });
        } catch (error) {
            await con.rollback();
            console.error('Error deleting plan:', error);
            res.status(500).json({success: false, error: 'Error al eliminar el plan' });
        } finally {
            con.end();
        }
    });

};
