// components/ModuleContent.tsx
import React from 'react';
import Table from './table';
import { dbName, sesionTime } from '../configs';
import { User } from '../views/dashboard';
import CountdownTimer from './viewSesionTime';

interface ModuleContentProps {
    module: string;
    setEditModal: any
    userSettings: User
}

const ModuleContent = ({ module, setEditModal, userSettings }: ModuleContentProps) => {

    const rolColor = (rol: string)=> {
        switch(rol) {
            case 'Admin':
                return '#1abc9c';
            case 'Profesor':
                return '#1a63bc';
            case 'Estudiante':
                return '#9aa738';
            default:
                return '#E1A6A2FF';
        }
    }

    const renderModuleContent = () => {
        switch (module.toUpperCase()) {
                case 'HOME':
                    return <div>Tus roles activos son
                    {userSettings.roles.map((r)=> <>
                    <div>{r} 
                        <div style={{backgroundColor: rolColor(r), height: '20px', width: '20px', borderRadius: '10px'}}></div>
                    </div>
                    </>) }
                    <CountdownTimer initialTime={sesionTime}></CountdownTimer>
                    </div>;
            default:
                return <Table project={dbName} collection={module} setEditModal={setEditModal}></Table>;

        }
    };

    return (
        <div>
            {renderModuleContent()}
        </div>
    );
};

export default ModuleContent;
