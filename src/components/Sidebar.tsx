// components/Sidebar.tsx
import React from 'react';
import styles from '../views/styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Sesion } from '../multiProjectLibrary/sesionManager';
import { Admin } from '../multiProjectLibrary/projectsManager';
import { MainRoutes } from '../App';
import { User } from '../multiProjectLibrary/databaseManager/frontServices/dashboard';
import { Module } from '../multiProjectLibrary/projectsManager/models/moduleModel';

interface SidebarProps {
  onSelectModule: (module: Module) => void;
  userSettings: User
}



const Sidebar: React.FC<SidebarProps> = ({ onSelectModule }: SidebarProps) => {
  const navigate = useNavigate()
  console.log('sidebar abre sesionprops');
  console.log(Sesion.props);
  
  var renderList: Module[] = Sesion.props.authorizeModules;

  const closeSesion = () => {
    sessionStorage.removeItem('settings');
   navigate(Admin.generateProjectRoute(MainRoutes.LOGIN))
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <h2>Modules</h2>
        <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          <ul >
            <li className={styles.rolColor} onClick={() => onSelectModule({name: 'Home', component: <></>})}>Home</li>
            {renderList.map((m) => <li className={styles.rolColorTeacher } onClick={() => onSelectModule(m)}>{m.name}</li>
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
