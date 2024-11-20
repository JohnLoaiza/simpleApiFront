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
    // Verificar el JWT en sessionStorage
    const sessionData = JSON.parse(sessionStorage.getItem('settings') || '{}');
    console.log('sesion storage es');
    console.log(sessionData);
    
    const token = sessionData?.jwt;
    const userId = sessionData?.userId;
 console.log('token es ' + token);
 
    if (!token) {
      setIsValid(false);
      return;
    }
    console.log('verifica token ' + token);

    // Llamar al endpoint que verifica el token
   
      var roles;
      const response =  axios.get(`${apiRoute}/${dbName}/users/${userId}`).then(
        (response) => {
          console.log(response.data);
          roles = JSON.parse(response.data.propierties.roles)
            }
    
      ).catch(
        (error) => {
          console.error(error);
          alert('No se pudo encontrar usuario con este id')
          navigate('/login');
        }
      );
var adminModules;
var teacherModules;
var studentModules;
   const rutas = axios
      .get(`${apiRoute}/${dbName}/rutas`)
      .then((response) => {
        
       const data : any[] = response.data as any[]
       console.log('data es');
       console.log(data);
       
       
        adminModules = data.filter((x: any) => x.propierties.rol === 'Admin')[0];
        teacherModules = data.filter((x: any) => x.propierties.rol === 'Profesor')[0];
        studentModules = data.filter((x: any) => x.propierties.rol === 'Estudiante')[0];
        const acumuloRutas = [...JSON.parse(studentModules.propierties.rutas),...JSON.parse(teacherModules.propierties.rutas), ...JSON.parse(adminModules.propierties.rutas) ]
           if (module != 'home' && acumuloRutas.includes(module)) {
                navigate('/login')
           }

        console.log('adminmodules');
        console.log(adminModules);
        
        
        setAdminModules(JSON.parse(adminModules.propierties.rutas))
        setTeacherModules(JSON.parse(teacherModules.propierties.rutas))
        setStudentModules(JSON.parse(studentModules.propierties.rutas))
      })
      .catch(() => {
        setIsValid(false);
      });
      axios
      .post(`${apiRoute}/${dbName}/users/verify-token`, { token })
      .then((response) => {
        console.log('verifica token ' + token);
        console.log('respuesta es ');
        console.log(response.data);
        
        
        
        if (response.data.success) {
            setSesionTime(response.data.timeRemaining);
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
  console.log('module es ' + module);
  console.log('lista de rutas para este user es ');
  console.log(allpermitedRutes);
  console.log('valie es ' + isValid);
  
  
  
    return <>{element}</>;
 
 
  // Si el token es válido, renderiza el componente protegido
 
};

export default ProtectedRoute;
