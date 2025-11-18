const mysql = require('mysql2');
const bcrypt = require("bcryptjs");

module.exports = (router, database) => {
    router.post('/users/create', async (req, res) => {
        const con = mysql.createConnection(database);

        try {
            console.log("[v0] Creating user with data:", req.body);

            // Validar campos requeridos
            if (!req.body.email || !req.body.password || !req.body.name || !req.body.lastname) {
                console.log("[v0] Missing required fields");
                return res.status(400).json({
                    success: false,
                    error: 'Faltan campos requeridos'
                });
            }

            // Verificar si el email ya existe
            const [existingUser] = await con.promise().query(
                'SELECT id FROM users WHERE email = ?',
                [req.body.email]
            );

            if (existingUser.length > 0) {
                console.log("[v0] Email already exists");
                return res.status(400).json({
                    success: false,
                    error: 'El email ya está registrado'
                });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Insertar usuario
            const [insertResult] = await con.promise().query(
                'INSERT INTO users (email, password, name, lastname, phone, `group`) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    req.body.email,
                    hashedPassword,
                    req.body.name,
                    req.body.lastname,
                    req.body.phone || '',
                    req.body.userType || 'user'
                ]
            );

            const userId = insertResult.insertId;
            console.log("[v0] User created with ID:", userId);

            // Si es usuario normal, crear la suscripción
            if (req.body.userType === 'user' && req.body.plan) {
                console.log("[v0] Creating subscription for user:", userId);
                await con.promise().query(
                    'INSERT INTO subscriptions (user, payment_id, amount, plan, expire, active) VALUES (?, ?, ?, ?, ?, ?)',
                    [userId, 0, 0, req.body.plan, req.body.expirationDate, 1]
                );
            }

            res.status(200).json({
                success: true,
                message: 'Usuario creado exitosamente',
                userId: userId
            });

        } catch (error) {
            console.error("[v0] Error in create user:", error.message);
            res.status(500).json({
                success: false,
                error: 'Error al crear el usuario: ' + error.message
            });
        } finally {
            con.end();
        }
    });
}
