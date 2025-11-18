import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const baseURL = `http://localhost:80`;
            const response = await axios.post(`${baseURL}/api/auth/login`, {
                username,
                password
            }, {
                withCredentials: true
            });

            if (response.data.status) {
                // Guardar token en localStorage si es necesario
                if (response.data.data.token) {
                    localStorage.setItem('token', response.data.data.token);
                }
                // Redirigir al admin
                navigate('/admin');
            } else {
                setError(response.data.info || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMsg = err.response?.data?.info || 'Error de conexión. Verifica tus credenciales.';
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Background */}
            <div className="login-background"></div>

            {/* Login Container */}
            <div className="login-container">
                <div className="login-card">
                    {/* Logo */}
                    <div className="login-header">
                        <div className="login-logo">
                            <h1>MF</h1>
                        </div>
                        <h2>MUNDOFORZA</h2>
                        <p>Panel de Administración</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Ingresa tu usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="login-footer">
                        <p>¿No tienes acceso? <Link to="/" className="link">Volver al inicio</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
