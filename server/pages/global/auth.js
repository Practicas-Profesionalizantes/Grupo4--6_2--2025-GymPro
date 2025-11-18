module.exports = (router, database, mpClient) => {
    const functions = require('../../functions/functions');
    const auth = require('../../functions/auth');
    const mysql = require('mysql2');
    const bcrypt = require('bcryptjs');

    // Login endpoint
    router.post('/auth/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validaciones
            if (!username || !password) {
                return res.status(400).json({
                    status: false,
                    err: 11,
                    info: 'Usuario y contraseña son requeridos'
                });
            }

            // Llamar a la función de login existente
            const loginResult = await auth.login(req, res, {
                username,
                password
            });

            res.json(loginResult);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                status: false,
                err: 500,
                info: 'Error del servidor'
            });
        }
    });

    // Logout endpoint
    router.post('/auth/logout', async (req, res) => {
        try {
            const token = functions.getCookie(req, 'token');

            if (!token) {
                return res.status(400).json({
                    status: false,
                    err: 10,
                    info: 'No hay sesión activa'
                });
            }

            const logoutResult = await auth.logout(token, false);

            if (logoutResult) {
                res.clearCookie('token');
                res.json({
                    status: true,
                    err: 0,
                    info: 'Sesión cerrada correctamente'
                });
            } else {
                res.status(400).json({
                    status: false,
                    err: 5,
                    info: 'Error al cerrar sesión'
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                status: false,
                err: 500,
                info: 'Error del servidor'
            });
        }
    });

    // Verify token endpoint
    router.get('/auth/verify', async (req, res) => {
        try {
            const token = functions.getCookie(req, 'token');

            if (!token) {
                return res.status(401).json({
                    status: false,
                    authenticated: false
                });
            }

            const user = auth.getUser(token);

            if (!user || user === true) {
                return res.status(401).json({
                    status: false,
                    authenticated: false
                });
            }

            // Verificar si es admin
            const isAdmin = auth.isAllowed(user.group, 'admin');

            res.json({
                status: true,
                authenticated: true,
                isAdmin,
                user: {
                    id: user.id,
                    group: user.group
                }
            });
        } catch (error) {
            console.error('Verify error:', error);
            res.status(500).json({
                status: false,
                authenticated: false
            });
        }
    });
};
