// components/Sidebar.tsx
import React from 'react';
import styles from './styles.module.css';

interface SidebarProps {
  onSelectModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectModule }) => {
  return (
    <div className={styles.sidebar}>
      <h2>Modules</h2>
      <ul>
        <li onClick={() => onSelectModule('Home')}>Home</li>
        <li onClick={() => onSelectModule('universidad')}>universidad</li>
        <li onClick={() => onSelectModule('aspecto_normativo')}>aspecto_normativo</li>
        <li onClick={() => onSelectModule('car_innovacion')}>car_innovacion</li>
        <li onClick={() => onSelectModule('practica_estrategia')}>practica_estrategia</li>
        <li onClick={() => onSelectModule('enfoque')}>enfoque</li>
      </ul>
    </div>
  );
};

export default Sidebar;
