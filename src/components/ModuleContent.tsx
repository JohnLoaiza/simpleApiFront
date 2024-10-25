// components/ModuleContent.tsx
import React from 'react';
import Table from './table';
import { dbName } from '../configs';
import { User } from '../views/dashboard';

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
        switch (module) {
            case 'Home':
                return <div>Welcome to the Home module! Here you can see a dashboard overview. {userSettings.roles + ''}
                {userSettings.roles.map((r)=> <>
                <div>{r} 
                    <div style={{backgroundColor: rolColor(r), height: '20px', width: '20px', borderRadius: '10px'}}></div>
                </div>
                </>) }
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
