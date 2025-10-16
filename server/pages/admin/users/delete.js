const mysql = require('mysql2/promise');

module.exports = (router, database) => {
    router.delete('/users/delete/:id', async (req, res) => {
        const con = await mysql.createConnection(database);
        const { id } = req.params;

        try {
            await con.beginTransaction();

            const [users] = await con.query('SELECT * FROM users WHERE id = ?', [id]);
            if (users.length === 0) {
                await con.rollback();
                return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
            }
            const userToDelete = users[0];

            await con.query('DELETE FROM subscriptions WHERE user = ?', [id]);
            await con.query('DELETE FROM users WHERE id = ?', [id]);

            await con.commit();
            res.json({ success: true, message: 'Usuario eliminado correctamente', user: userToDelete });
        } catch (error) {
            await con.rollback();
            console.error('Error eliminando usuario:', error);
            res.status(500).json({ success: false, error: 'Error al eliminar el usuario' });
        } finally {
            await con.end();
        }
    });
};
