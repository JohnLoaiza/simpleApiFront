import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { apiRoute, dbName } from '../configs';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate(); // Hook de navegación

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiRoute}/${dbName}/users/verify`, {
                userField: 'username',
                encryptedField: 'password',
                encrypted: password,
                user: username,
            });

            setMessage(response.data.message);

            // Navegación si la respuesta es exitosa
            if (response.data.success) {
                localStorage.setItem('settings', JSON.stringify({
                    sesion:true,
                    userId: response.data.id
                }));
                navigate('/dashboard'); // Redirige a la ruta principal
            } 
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Nombre de usuario:</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Contraseña:</label>
                    <input
                        type="password"
                        className={styles.inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                </button>

                <p className={styles.registerPrompt}>
                    ¿Aún no tienes una cuenta?{' '}
                    <Link to="/register" className={styles.registerLink}>
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
