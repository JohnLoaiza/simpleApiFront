import React, { useEffect, useState } from 'react';
import { json, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiRoute, dbName, sesionTime, setSesionTime } from '../configs';
import { setAdminModules, setStudentModules, setTeacherModules } from './Sidebar';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { module = 'home' } = useParams<{ module: string}>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [allpermitedRutes, setAllpermitedRutes] = useState<string[]>([])
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const verifyUserAndRoutes = async () => {
      try {
        // Obtener datos de sesión
        const sessionData = JSON.parse(sessionStorage.getItem('settings') || '{}');
        const token = sessionData?.jwt;
        const userId = sessionData?.userId;
  
        if (!token) {
          setIsValid(false);
          return;
        }
  
        // Verificar token y obtener datos del usuario
        const userResponse = await axios.get(`${apiRoute}/${dbName}/users/${userId}`);
        const roles = JSON.parse(userResponse.data.propierties.roles);
  
        // Obtener rutas
        const rutasResponse = await axios.get(`${apiRoute}/${dbName}/rutas`);
        const data: any[] = rutasResponse.data;
  
        const adminModules = data.find((x) => x.propierties.rol === 'Admin');
        const teacherModules = data.find((x) => x.propierties.rol === 'Profesor');
        const studentModules = data.find((x) => x.propierties.rol === 'Estudiante');

        var acumuloRutas : any = [ ]

        if (roles.includes('Profesor')) {
          acumuloRutas = [...acumuloRutas, ...JSON.parse(teacherModules?.propierties.rutas || '[]')];
        }
        if (roles.includes('Estudiante')) {
          acumuloRutas = [...acumuloRutas, ...JSON.parse(studentModules?.propierties.rutas || '[]')];
        }
      
        if (roles.includes('Admin')) {
          acumuloRutas = [...acumuloRutas, ...JSON.parse(adminModules?.propierties.rutas || '[]')];
        }
  
  
        setAdminModules(JSON.parse(adminModules?.propierties.rutas || '[]'));
        setTeacherModules(JSON.parse(teacherModules?.propierties.rutas || '[]'));
        setStudentModules(JSON.parse(studentModules?.propierties.rutas || '[]'));
        setAllpermitedRutes(acumuloRutas);
  
        // Validar rutas permitidas
        if (module !== 'home' && !acumuloRutas.includes(module)) {
          alert('No tienes acceso a este modulo')
          navigate('/');
          return;
        }
  
        // Verificar token en el servidor
        const tokenResponse = await axios.post(`${apiRoute}/${dbName}/users/verify-token`, { token });
        if (tokenResponse.data.success) {
          setSesionTime(tokenResponse.data.timeRemaining);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error verificando usuario y rutas:', error);
        setIsValid(false);
        navigate('/login');
      }
    };
  
    verifyUserAndRoutes();
  }, [module]); // Dependencia en module para que se revalide cuando cambie
  

  if (isValid === null) {
    // Puedes mostrar un cargando o una transición mientras se verifica
    return <div>Loading...</div>;
  }

  if (!isValid) {
    // Si el token no es válido, redirige al login
    return <Navigate to="/login" state={{ from: location }} />;
  }
  console.log('module es ' + module);
  console.log('lista de rutas para este user es ');
  console.log(allpermitedRutes);
  console.log('valie es ' + isValid);
  
  
  
    return <>{element}</>;
 
 
  // Si el token es válido, renderiza el componente protegido
 
};

export default ProtectedRoute;
