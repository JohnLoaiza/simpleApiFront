import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../utils/styles.module.css';
import { apiRoute } from '../../configs';
import { Link, useNavigate } from 'react-router-dom';
import { Admin } from '../../projectsManager';
import { MainRoutes } from '../../routesManager/multiProjectRoutes';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate(); // Hook de navegación

      useEffect(() => {
        return () => { };
      }, []);
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiRoute}/${Admin.projectSelected!.props.name}/users/verify`, {
                userField: 'username',
                encryptedField: 'password',
                encrypted: password,
                user: username,
            });

            setMessage(response.data.message);
                    console.log('al iniciar sesion la respuesta es ');
                    console.log(response.data);
                    
                    
            if (response.data.success) {
                // Guardar la sesión en sessionStorage
                sessionStorage.setItem('settings', JSON.stringify({
                    sesion: true,
                    userId: response.data.id,
                    jwt: response.data.token // Guardar el JWT en sessionStorage
                }));
            
                // Redirigir a la ruta principal
                navigate(Admin.generateProjectRoute(MainRoutes.DASHBOARD));
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
                    <Link to={Admin.generateProjectRoute(MainRoutes.REGISTER)} className={styles.registerLink}>
                        Regístrate aquí
                    </Link>
                    {Admin.generateProjectRoute(MainRoutes.REGISTER)}
                </p>
            </form>
        </div>
    );
};

export default Login;
