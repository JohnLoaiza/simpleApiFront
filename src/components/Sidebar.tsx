// components/Sidebar.tsx
import React from 'react';
import styles from '../views/styles.module.css';
import { User } from '../views/dashboard';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onSelectModule: (module: string) => void;
  userSettings: User
}

const adminModules = [
  'universidad',
  'users',
  'aspecto_normativo',
  'car_innovacion',
  'practica_estrategia',
  'enfoque'
]

const teacherModules = [
  'Cursos',
  'Estudiantes',
  'Asignaturas',
  'Notas',
  'Evaluaciones',
]

const studentModules = [
  'Mis cursos',
  'Liquidación de matricula',
  'Horario'
]

const Sidebar: React.FC<SidebarProps> = ({ onSelectModule, userSettings }: SidebarProps) => {
  const navigate = useNavigate()
  var renderList: string[] = []

  if (userSettings.roles.includes('Profesor')) {
    renderList = [...renderList, ...teacherModules];
  }
  if (userSettings.roles.includes('Estudiante')) {
    renderList = [...renderList, ...studentModules];
  }

  if (userSettings.roles.includes('Admin')) {
    renderList = [...renderList, ...adminModules];
  }

  const closeSesion = () => {
    localStorage.removeItem('settings');
   navigate('/login')
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <h2>Modules</h2>
        <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          <ul >
            <li className={styles.rolColor} onClick={() => onSelectModule('Home')}>Home</li>
            {renderList.map((m) => <li className={adminModules.includes(m) ?  styles.rolColorAdmin : teacherModules.includes(m) ? styles.rolColorTeacher : styles.rolColorStudent} onClick={() => onSelectModule(m)}>{m}</li>
            )}
          </ul>
        </div>
      </div>

      <ul>
        <li className={styles.rolColor} onClick={() => closeSesion()}>Cerrar sesión</li>
      </ul>

    </div>
  );
};

export default Sidebar;
