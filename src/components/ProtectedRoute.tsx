import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { apiRoute, dbName } from '../configs';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Verificar el JWT en sessionStorage
    const sessionData = JSON.parse(sessionStorage.getItem('settings') || '{}');
    console.log('sesion storage es');
    console.log(sessionData);
    
    const token = sessionData?.jwt;
 console.log('token es ' + token);
 
    if (!token) {
      setIsValid(false);
      return;
    }
    console.log('verifica token ' + token);

    // Llamar al endpoint que verifica el token
    axios
      .post(`${apiRoute}/${dbName}/users/verify-token`, { token })
      .then((response) => {
        console.log('verifica token ' + token);
        console.log('respuesta es ');
        console.log(response.data);
        
        
        
        if (response.data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      })
      .catch(() => {
        setIsValid(false);
      });
  }, []);

  if (isValid === null) {
    // Puedes mostrar un cargando o una transición mientras se verifica
    return <div>Loading...</div>;
  }

  if (!isValid) {
    // Si el token no es válido, redirige al login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si el token es válido, renderiza el componente protegido
  return <>{element}</>;
};

export default ProtectedRoute;
