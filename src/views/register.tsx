import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { apiRoute, dbName } from '../configs';
import { Link } from 'react-router-dom';

const rolesList = ['Admin', 'Profesor', 'Estudiante']; // Lista de roles disponibles

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            // Primera solicitud para encriptar la contraseña
            const encryptResponse = await axios.post(`${apiRoute}/${dbName}/users/encrypt`, {
                data: password
            });
            console.log(encryptResponse.data);
            
            // Almacenamos la contraseña encriptada
            const encryptedPassword = encryptResponse.data.hashedPassword;
            setHashedPassword(encryptedPassword);
            console.log('contraseña encriptada es');
            console.log(encryptedPassword);
            
            // Segunda solicitud para registrar el usuario con la contraseña encriptada
            const insertResponse = await axios.post(`${apiRoute}/${dbName}/users/insert`, {
                username: username,
                password: encryptedPassword,
                roles: selectedRoles
            });

            // Manejamos la respuesta exitosa del registro
            setMessage(insertResponse.data.message || 'Registro exitoso');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleClick = (role: string) => {
        setSelectedRoles(prevRoles =>
            prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]
        );
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleRegister}>
                <h1>Registro</h1>
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

                <div className={styles.roleContainer}>
                    <p className={styles.roleTitle}>Seleccione roles:</p>
                    <div className={styles.rolesList}>
                        {rolesList.map((role) => (
                            <button
                                type="button"
                                key={role}
                                className={`${styles.roleButton} ${
                                    selectedRoles.includes(role) ? styles.roleSelected : ''
                                }`}
                                onClick={() => handleRoleClick(role)}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
<br></br>
                <button type="submit" className={styles.submitButton}>
                    {loading ? 'Cargando...' : 'Registrar'}
                </button>

                {hashedPassword && (
                    <p>Contraseña encriptada: {hashedPassword}</p>
                )}
            </form>
            <p className={styles.registerPrompt}>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className={styles.registerLink}>
                        Inicia sesión aquí
                    </Link>
                </p>
        </div>
    );
};

export default Register;
