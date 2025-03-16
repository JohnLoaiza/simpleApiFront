// components/Sidebar.tsx
import React from 'react';
import styles from '../../utils/styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Sesion } from '../../../sesionManager';
import { Admin } from '../../../projectsManager';
import { User } from '../dashboard';
import { Module } from '../../../projectsManager/models/moduleModel';
import { MainRoutes } from '../../../routesManager/multiProjectRoutes';

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
